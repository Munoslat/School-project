import { useState, useEffect, useRef } from 'react'
import './App.css'

// ===== DATA =====
const NAV_ITEMS = [
  {section:'Main'},
  {icon:'📊',label:'Dashboard'},
  {icon:'🎓',label:'Students',badge:'842'},
  {icon:'👨‍🏫',label:'Teachers',badge:'48'},
  {icon:'📚',label:'Classes'},
  {icon:'📅',label:'Timetable'},
  {section:'Academic'},
  {icon:'📝',label:'Exams & Grades'},
  {icon:'✅',label:'Attendance'},
  {icon:'📖',label:'Homework'},
  {section:'Admin'},
  {icon:'💰',label:'Fees & Finance'},
  {icon:'📢',label:'Notices',badge:'3'},
  {icon:'⚙️',label:'Settings'},
]

const STUDENTS = [
  {init:'AH',color:'#3b5bdb',name:'Ahmed Hassan',   cls:'Grade 10A',grade:'92%',status:'Active',  fees:'Paid',    sc:'badge-green', fc:'badge-green' },
  {init:'FM',color:'#0ca678',name:'Fatima Mohamed', cls:'Grade 9B', grade:'87%',status:'Active',  fees:'Partial', sc:'badge-green', fc:'badge-orange'},
  {init:'OA',color:'#f76707',name:'Omar Ali',       cls:'Grade 11A',grade:'78%',status:'Present', fees:'Paid',    sc:'badge-blue',  fc:'badge-green' },
  {init:'ZI',color:'#7c3aed',name:'Zahra Ibrahim',  cls:'Grade 8C', grade:'95%',status:'Active',  fees:'Unpaid',  sc:'badge-green', fc:'badge-red'   },
  {init:'MN',color:'#e03131',name:'Muno Noor',      cls:'Grade 12A',grade:'88%',status:'Active',  fees:'Paid',    sc:'badge-green', fc:'badge-green' },
  {init:'CA',color:'#0891b2',name:'Cabdi Axmed',    cls:'Grade 11B',grade:'74%',status:'Absent',  fees:'Partial', sc:'badge-red',   fc:'badge-orange'},
  {init:'HW',color:'#6d28d9',name:'Hodan Warsame',  cls:'Grade 10B',grade:'91%',status:'Active',  fees:'Paid',    sc:'badge-green', fc:'badge-green' },
]

const TEACHERS = [
  {init:'MH',color:'#3b5bdb',name:'Mr. Hassan',    subj:'Mathematics',  grade:'Grades 9–12', status:'On Duty', students:124, exp:'8yr' },
  {init:'MA',color:'#0ca678',name:'Ms. Ayan',      subj:'English Lit',  grade:'Grades 10–11',status:'In Class',students:98,  exp:'5yr' },
  {init:'MO',color:'#f76707',name:'Mr. Omar',      subj:'Science',      grade:'Grades 9–10', status:'On Duty', students:110, exp:'6yr' },
  {init:'MH2',color:'#7c3aed',name:'Ms. Hodan',   subj:'History',      grade:'Grades 11–12',status:'Off Duty',students:87,  exp:'4yr' },
  {init:'AF',color:'#e03131',name:'Mr. Ali Farah', subj:'ICT',          grade:'Grades 8–12', status:'On Duty', students:145, exp:'3yr' },
  {init:'SA',color:'#0891b2',name:'Ms. Saado',     subj:'Islamic Studies',grade:'All Grades', status:'In Class',students:200,exp:'10yr'},
]

const SCHEDULE = [
  {time:'08:00',color:'#3b5bdb',title:'Mathematics — Grade 10A',    sub:'Mr. Hassan · Room 204'},
  {time:'09:30',color:'#0ca678',title:'English Literature — Grade 11B',sub:'Ms. Ayan · Room 108'},
  {time:'11:00',color:'#f76707',title:'Science Lab — Grade 9A',     sub:'Mr. Omar · Lab 1'},
  {time:'13:00',color:'#7c3aed',title:'Assembly & Lunch Break',     sub:'All classes · Main Hall'},
  {time:'14:00',color:'#e03131',title:'History — Grade 12A',        sub:'Ms. Hodan · Room 302'},
  {time:'15:30',color:'#94a3b8',title:'School Dismissal',           sub:'All students'},
]

const TIMETABLE = {
  days: ['Mon','Tue','Wed','Thu','Fri'],
  times: ['8:00','9:30','11:00','12:30','14:00','15:00'],
  slots: [
    ['Math','English','Science','Break','History','ICT'],
    ['English','Math','ICT','Break','Science','Islamic'],
    ['Science','History','Math','Break','English','Math'],
    ['ICT','Science','History','Break','Math','English'],
    ['History','Islamic','English','Break','Math','Science'],
  ]
}

const FEES = [
  {name:'Zahra Ibrahim', cls:'Grade 8C', amount:'$120', due:'May 15'},
  {name:'Fatima Mohamed',cls:'Grade 9B', amount:'$60',  due:'May 20'},
  {name:'Abdi Warsame',  cls:'Grade 7A', amount:'$120', due:'Overdue'},
  {name:'Hodan Ali',     cls:'Grade 10B',amount:'$80',  due:'May 25'},
]

const NOTICES = [
  {tag:'URGENT',tagBg:'var(--red-l)',  tagColor:'var(--red)',  title:'Final Exams — May 20–30',           date:'Posted: 10 May 2025'},
  {tag:'EVENT', tagBg:'var(--blue-l)', tagColor:'var(--blue)', title:'Parent-Teacher Meeting — May 15',   date:'Posted: 8 May 2025'},
  {tag:'INFO',  tagBg:'var(--green-l)',tagColor:'var(--green)',title:'Summer holiday starts June 15',      date:'Posted: 5 May 2025'},
]

const MONTHS     = ['Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May']
const ATTENDANCE = [88,91,87,93,85,96,92,94,91]

const EXAMS = [
  {subj:'Mathematics',  date:'May 20', grade:'10A', room:'Hall A', duration:'3h'},
  {subj:'English',      date:'May 21', grade:'All', room:'Hall B', duration:'2h'},
  {subj:'Science',      date:'May 22', grade:'9–11',room:'Lab',    duration:'2.5h'},
  {subj:'History',      date:'May 24', grade:'11A', room:'Room 302',duration:'2h'},
  {subj:'ICT',          date:'May 25', grade:'All', room:'Computer Lab',duration:'2h'},
  {subj:'Islamic Studies',date:'May 26',grade:'All',room:'Hall A', duration:'1.5h'},
]

const HOMEWORK = [
  {subj:'Math',    title:'Algebra — Chapter 7 Exercises',  due:'Tomorrow',  grade:'10A', status:'Pending'},
  {subj:'English', title:'Essay: My Favourite Book',        due:'May 14',    grade:'11B', status:'Submitted'},
  {subj:'Science', title:'Lab Report — Photosynthesis',     due:'May 16',    grade:'9A',  status:'Pending'},
  {subj:'History', title:'Timeline: World War II',          due:'May 17',    grade:'12A', status:'Graded'},
]

// ===== FADE HOOK =====
function useFade() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.style.cssText = 'opacity:0;transform:translateY(24px);transition:opacity .55s ease,transform .55s ease'
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity='1'; el.style.transform='translateY(0)' }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// ===== SIDEBAR =====
function Sidebar({ active, setActive }) {
  return (
    <aside className="sidebar">
      <div className="sb-logo">
        <div className="sb-logo-text">EduManage</div>
        <div className="sb-logo-sub">School Management System</div>
      </div>
      <div className="sb-user">
        <div className="sb-avatar">M</div>
        <div>
          <div className="sb-user-name">Muno Admin</div>
          <div className="sb-user-role">Principal</div>
        </div>
      </div>
      <nav className="sb-nav">
        {NAV_ITEMS.map((item,i) =>
          item.section
            ? <div className="sb-section" key={i}>{item.section}</div>
            : (
              <button key={i} className={`sb-item ${active===item.label?'active':''}`} onClick={() => setActive(item.label)}>
                <span className="sb-icon">{item.icon}</span>
                {item.label}
                {item.badge && <span className="sb-badge">{item.badge}</span>}
              </button>
            )
        )}
      </nav>
    </aside>
  )
}

// ===== TOPBAR =====
function Topbar({ active, onAdd }) {
  return (
    <div className="topbar">
      <div>
        <div className="topbar-title">{active}</div>
        <div className="topbar-sub">Monday, 12 May 2025 — Academic Year 2024–25</div>
      </div>
      <div className="topbar-right">
        <div className="search-wrap"><span>🔍</span><input placeholder="Search students, teachers..."/></div>
        <div className="notif-btn">🔔<div className="notif-dot"></div></div>
        <button className="add-btn" onClick={onAdd}>+ Add Student</button>
      </div>
    </div>
  )
}

// ===== DASHBOARD PAGE =====
function DashboardPage() {
  const r1=useFade(),r2=useFade(),r3=useFade(),r4=useFade()
  return (
    <div className="content">
      {/* STATS */}
      <div className="stats-row" ref={r1}>
        {[
          {icon:'🎓',bg:'var(--blue-l)',  num:'842',  label:'Total Students', change:'+12 ↑', up:true},
          {icon:'👨‍🏫',bg:'var(--green-l)', num:'48',   label:'Teachers',       change:'+2 ↑',  up:true},
          {icon:'✅',bg:'var(--orange-l)',num:'94%',  label:'Attendance Today',change:'-3% ↓', up:false},
          {icon:'💰',bg:'var(--purple-l)',num:'$24k', label:'Fees Collected',  change:'+8% ↑', up:true},
        ].map((s,i) => (
          <div className="stat-card" key={i}>
            <div className="sc-top"><div className="sc-icon" style={{background:s.bg}}>{s.icon}</div><span className={`sc-change ${s.up?'sc-up':'sc-down'}`}>{s.change}</span></div>
            <div className="sc-num">{s.num}</div>
            <div className="sc-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* MID GRID */}
      <div className="mid-grid" ref={r2}>
        <div className="card">
          <div className="card-head"><h3>Recent Students</h3><button className="card-link">View all →</button></div>
          <table><thead><tr><th>Student</th><th>Class</th><th>Grade</th><th>Status</th><th>Fees</th></tr></thead>
            <tbody>
              {STUDENTS.slice(0,5).map((s,i) => (
                <tr key={i}>
                  <td><div className="student-name"><div className="s-av" style={{background:s.color}}>{s.init}</div>{s.name}</div></td>
                  <td>{s.cls}</td><td>{s.grade}</td>
                  <td><span className={`badge ${s.sc}`}>{s.status}</span></td>
                  <td><span className={`badge ${s.fc}`}>{s.fees}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-head"><h3>Today's Schedule</h3><button className="card-link">Full timetable →</button></div>
          <div className="schedule-list">
            {SCHEDULE.map((s,i) => (
              <div className="sch-item" key={i}>
                <div className="sch-time">{s.time}</div>
                <div className="sch-dot" style={{background:s.color}}></div>
                <div><div className="sch-title">{s.title}</div><div className="sch-sub">{s.sub}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="bottom-grid" ref={r3}>
        <div className="card">
          <div className="card-head"><h3>Monthly Attendance</h3><button className="card-link">Details →</button></div>
          <div className="chart-wrap">
            <div className="chart-bars">
              {ATTENDANCE.map((v,i) => (
                <div key={i} className="bar-col" style={{height:`${v*.65}px`,background:i===8?'var(--blue)':'var(--blue-l)'}} title={`${MONTHS[i]}: ${v}%`}/>
              ))}
            </div>
          </div>
          <div className="chart-labels">{MONTHS.map((m,i) => <div className="chart-label" key={i}>{m}</div>)}</div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Pending Fees</h3><button className="card-link">Collect →</button></div>
          {FEES.map((f,i) => (
            <div className="fee-item" key={i}>
              <div><div className="fee-name">{f.name}</div><div className="fee-class">{f.cls}</div></div>
              <div style={{textAlign:'right'}}>
                <div className="fee-amount">{f.amount}</div>
                <div style={{fontSize:'.7rem',color:f.due==='Overdue'?'var(--red)':'var(--muted)',marginTop:2}}>{f.due}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-head"><h3>Notices & Events</h3><button className="card-link">Post →</button></div>
          {NOTICES.map((n,i) => (
            <div className="notice-item" key={i}>
              <span className="notice-tag" style={{background:n.tagBg,color:n.tagColor}}>{n.tag}</span>
              <div className="notice-title">{n.title}</div>
              <div className="notice-date">{n.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ===== STUDENTS PAGE =====
function StudentsPage({ onAdd }) {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('')
  const ref = useFade()
  const list = STUDENTS.filter(s =>
    (!q || s.name.toLowerCase().includes(q.toLowerCase())) &&
    (!filter || s.cls.includes(filter))
  )
  return (
    <div className="content" ref={ref}>
      <div className="page-header">
        <div><h2 className="page-title">Students</h2><p className="page-sub">842 students enrolled · Academic Year 2024–25</p></div>
        <button className="add-btn" onClick={onAdd}>+ Add Student</button>
      </div>
      <div className="toolbar">
        <div className="search-bar"><span>🔍</span><input placeholder="Search by name..." value={q} onChange={e=>setQ(e.target.value)}/></div>
        <select className="filter-sel" value={filter} onChange={e=>setFilter(e.target.value)}>
          <option value="">All Grades</option>
          <option>Grade 8</option><option>Grade 9</option><option>Grade 10</option><option>Grade 11</option><option>Grade 12</option>
        </select>
      </div>
      <div className="card">
        <table>
          <thead><tr><th>Student</th><th>Class</th><th>Grade</th><th>Status</th><th>Fees</th><th>Actions</th></tr></thead>
          <tbody>
            {list.map((s,i) => (
              <tr key={i}>
                <td><div className="student-name"><div className="s-av" style={{background:s.color}}>{s.init}</div><div><div>{s.name}</div><div style={{fontSize:'.7rem',color:'var(--muted)'}}>ID: STU-{1000+i}</div></div></div></td>
                <td>{s.cls}</td><td style={{fontWeight:700,color:'var(--blue)'}}>{s.grade}</td>
                <td><span className={`badge ${s.sc}`}>{s.status}</span></td>
                <td><span className={`badge ${s.fc}`}>{s.fees}</span></td>
                <td><div style={{display:'flex',gap:6}}>
                  <button className="action-btn edit">✏️</button>
                  <button className="action-btn del">🗑️</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length===0 && <div className="empty-state">No students found</div>}
      </div>
    </div>
  )
}

// ===== TEACHERS PAGE =====
function TeachersPage() {
  const ref = useFade()
  return (
    <div className="content" ref={ref}>
      <div className="page-header">
        <div><h2 className="page-title">Teachers</h2><p className="page-sub">48 teaching staff · {TEACHERS.filter(t=>t.status!=='Off Duty').length} on duty today</p></div>
        <button className="add-btn">+ Add Teacher</button>
      </div>
      <div className="teachers-grid">
        {TEACHERS.map((t,i) => (
          <div className="teacher-card" key={i}>
            <div className="tc-top">
              <div className="tc-av" style={{background:t.color}}>{t.init}</div>
              <div><div className="tc-name">{t.name}</div><div className="tc-subj">{t.subj}</div></div>
            </div>
            <div className="tc-info">
              <div className="tc-row"><span>📚</span><span>{t.grade}</span></div>
              <div className="tc-row"><span>👥</span><span>{t.students} students</span></div>
              <div className="tc-row"><span>⏱️</span><span>{t.exp} experience</span></div>
            </div>
            <div className="tc-footer">
              <span className={`badge ${t.status==='On Duty'?'badge-green':t.status==='In Class'?'badge-blue':'badge-red'}`}>{t.status}</span>
              <button className="action-btn edit" style={{fontSize:'.75rem',padding:'.25rem .65rem'}}>View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== TIMETABLE PAGE =====
function TimetablePage() {
  const ref = useFade()
  const colors = {'Math':'var(--blue)','English':'var(--green)','Science':'var(--orange)','History':'var(--purple)','ICT':'var(--red)','Islamic':'#0891b2','Break':'var(--muted)'}
  return (
    <div className="content" ref={ref}>
      <div className="page-header">
        <div><h2 className="page-title">Timetable</h2><p className="page-sub">Weekly schedule — Grade 10A</p></div>
        <select className="filter-sel"><option>Grade 10A</option><option>Grade 9B</option><option>Grade 11A</option></select>
      </div>
      <div className="card" style={{overflow:'auto'}}>
        <table className="tt-table">
          <thead>
            <tr>
              <th style={{minWidth:80}}>Time</th>
              {TIMETABLE.days.map(d => <th key={d}>{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {TIMETABLE.times.map((t,i) => (
              <tr key={i}>
                <td className="tt-time">{t}</td>
                {TIMETABLE.slots.map((day,j) => {
                  const subj = day[i]
                  const isBreak = subj==='Break'
                  return (
                    <td key={j}>
                      <div className="tt-cell" style={{background:isBreak?'rgba(148,163,184,.1)':`rgba(${subj==='Math'?'59,91,219':subj==='English'?'12,166,120':subj==='Science'?'247,103,7':subj==='History'?'124,58,237':subj==='ICT'?'224,49,49':'8,145,178'},.1)`,color:isBreak?'var(--muted)':colors[subj]||'var(--blue)'}}>
                        {isBreak ? '☕ Break' : subj}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ===== EXAMS PAGE =====
function ExamsPage() {
  const ref = useFade()
  return (
    <div className="content" ref={ref}>
      <div className="page-header">
        <div><h2 className="page-title">Exams & Grades</h2><p className="page-sub">Final examinations — May 2025</p></div>
        <button className="add-btn">+ Add Exam</button>
      </div>
      <div className="exams-grid">
        {EXAMS.map((e,i) => (
          <div className="exam-card" key={i}>
            <div className="exam-subj">{e.subj}</div>
            <div className="exam-meta">
              <div className="exam-row"><span>📅</span><span>{e.date}</span></div>
              <div className="exam-row"><span>🎓</span><span>{e.grade}</span></div>
              <div className="exam-row"><span>🏛️</span><span>{e.room}</span></div>
              <div className="exam-row"><span>⏱️</span><span>{e.duration}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== ATTENDANCE PAGE =====
function AttendancePage() {
  const [marked, setMarked] = useState({})
  const ref = useFade()
  const mark = (id, status) => setMarked(m => ({...m,[id]:status}))
  return (
    <div className="content" ref={ref}>
      <div className="page-header">
        <div><h2 className="page-title">Attendance</h2><p className="page-sub">Today: Monday, 12 May 2025</p></div>
        <button className="add-btn" onClick={() => alert('Attendance saved!')}>💾 Save Attendance</button>
      </div>
      <div className="att-grid">
        {STUDENTS.map((s,i) => {
          const cur = marked[i]
          return (
            <div className="att-card" key={i}>
              <div className="att-av" style={{background:s.color}}>{s.init}</div>
              <div className="att-name">{s.name}</div>
              <div className="att-cls">{s.cls}</div>
              <div className="att-btns">
                <button className={`att-btn present ${cur==='P'?'sel':''}`} onClick={() => mark(i,'P')}>✓ Present</button>
                <button className={`att-btn absent  ${cur==='A'?'sel':''}`} onClick={() => mark(i,'A')}>✕ Absent</button>
                <button className={`att-btn late    ${cur==='L'?'sel':''}`} onClick={() => mark(i,'L')}>⏰ Late</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ===== HOMEWORK PAGE =====
function HomeworkPage() {
  const ref = useFade()
  return (
    <div className="content" ref={ref}>
      <div className="page-header">
        <div><h2 className="page-title">Homework</h2><p className="page-sub">Assigned tasks and submission tracking</p></div>
        <button className="add-btn">+ Assign Homework</button>
      </div>
      <div className="card">
        <table>
          <thead><tr><th>Subject</th><th>Task</th><th>Grade</th><th>Due</th><th>Status</th></tr></thead>
          <tbody>
            {HOMEWORK.map((h,i) => (
              <tr key={i}>
                <td><span className="hw-subj">{h.subj}</span></td>
                <td style={{fontWeight:600,fontSize:'.85rem'}}>{h.title}</td>
                <td>{h.grade}</td>
                <td style={{fontSize:'.8rem',color:h.due==='Tomorrow'?'var(--red)':'var(--muted)'}}>{h.due}</td>
                <td><span className={`badge ${h.status==='Submitted'?'badge-green':h.status==='Graded'?'badge-blue':'badge-orange'}`}>{h.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ===== FEES PAGE =====
function FeesPage() {
  const ref = useFade()
  return (
    <div className="content" ref={ref}>
      <div className="page-header">
        <div><h2 className="page-title">Fees & Finance</h2><p className="page-sub">Collection status — May 2025</p></div>
        <button className="add-btn">+ Record Payment</button>
      </div>
      <div className="stats-row">
        {[{icon:'💰',bg:'var(--green-l)',num:'$24,000',label:'Collected',change:'+8% ↑',up:true},
          {icon:'⏳',bg:'var(--orange-l)',num:'$3,800', label:'Pending',change:'4 students',up:false},
          {icon:'❌',bg:'var(--red-l)',   num:'$1,200', label:'Overdue', change:'Urgent',up:false},
          {icon:'📊',bg:'var(--blue-l)',  num:'86%',   label:'Collection Rate',change:'Target: 95%',up:true},
        ].map((s,i) => (
          <div className="stat-card" key={i}>
            <div className="sc-top"><div className="sc-icon" style={{background:s.bg}}>{s.icon}</div><span className={`sc-change ${s.up?'sc-up':'sc-down'}`}>{s.change}</span></div>
            <div className="sc-num">{s.num}</div>
            <div className="sc-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-head"><h3>Pending Payments</h3></div>
        {FEES.map((f,i) => (
          <div className="fee-item" key={i} style={{padding:'1rem 1.4rem'}}>
            <div><div className="fee-name">{f.name}</div><div className="fee-class">{f.cls}</div></div>
            <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
              <div style={{textAlign:'right'}}>
                <div className="fee-amount">{f.amount}</div>
                <div style={{fontSize:'.7rem',color:f.due==='Overdue'?'var(--red)':'var(--muted)'}}>{f.due}</div>
              </div>
              <button className="add-btn" style={{padding:'.35rem .8rem',fontSize:'.75rem'}}>Collect</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== MODAL =====
function Modal({ onClose, showToast }) {
  const [form, setForm] = useState({name:'',cls:'Grade 9',status:'Active',fees:'Unpaid'})
  const save = () => {
    if (!form.name) { showToast('⚠️ Please enter student name'); return }
    showToast(`✅ ${form.name} added successfully!`)
    onClose()
  }
  return (
    <div className="modal-overlay" onClick={e => e.target.className==='modal-overlay' && onClose()}>
      <div className="modal-box">
        <div className="modal-head">
          <div className="modal-title">🎓 Add New Student</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="mf-grid">
            <div className="mf"><label>Full Name *</label><input type="text" placeholder="Ahmed Hassan" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
            <div className="mf"><label>Student ID</label><input type="text" placeholder="Auto-generated" readOnly style={{opacity:.6}}/></div>
          </div>
          <div className="mf-grid">
            <div className="mf"><label>Class</label><select value={form.cls} onChange={e=>setForm(f=>({...f,cls:e.target.value}))}>{['Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'].map(g=><option key={g}>{g}</option>)}</select></div>
            <div className="mf"><label>Gender</label><select><option>Male</option><option>Female</option></select></div>
          </div>
          <div className="mf-grid">
            <div className="mf"><label>Parent Phone</label><input type="tel" placeholder="+252..."/></div>
            <div className="mf"><label>Date of Birth</label><input type="date"/></div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="modal-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-btn-save" onClick={save}>Add Student</button>
        </div>
      </div>
    </div>
  )
}

// ===== APP =====
export default function App() {
  const [active, setActive] = useState('Dashboard')
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const renderPage = () => {
    switch(active) {
      case 'Dashboard':    return <DashboardPage />
      case 'Students':     return <StudentsPage onAdd={() => setShowModal(true)} />
      case 'Teachers':     return <TeachersPage />
      case 'Timetable':    return <TimetablePage />
      case 'Exams & Grades': return <ExamsPage />
      case 'Attendance':   return <AttendancePage />
      case 'Homework':     return <HomeworkPage />
      case 'Fees & Finance': return <FeesPage />
      default:
        return (
          <div className="content">
            <div className="page-header"><h2 className="page-title">{active}</h2></div>
            <div className="empty-state" style={{padding:'4rem',textAlign:'center',color:'var(--muted)'}}>
              <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🚧</div>
              <div style={{fontSize:'1rem',fontWeight:600}}>Coming Soon</div>
              <div style={{fontSize:'.85rem',marginTop:'.5rem'}}>This section is under development.</div>
            </div>
          </div>
        )
    }
  }

  return (
    <div style={{display:'flex'}}>
      <Sidebar active={active} setActive={setActive} />
      <div className="main">
        <Topbar active={active} onAdd={() => setShowModal(true)} />
        {renderPage()}
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} showToast={showToast} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}