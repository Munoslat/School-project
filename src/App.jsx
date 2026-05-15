import { useState } from 'react'
import './App.css'

const NAV = [
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
  {init:'AH',color:'#3b5bdb',name:'Ahmed Hassan',cls:'Grade 10A',grade:'92%',status:'Active',fees:'Paid',sc:'badge-green',fc:'badge-green'},
  {init:'FM',color:'#0ca678',name:'Fatima Mohamed',cls:'Grade 9B',grade:'87%',status:'Active',fees:'Partial',sc:'badge-green',fc:'badge-orange'},
  {init:'OA',color:'#f76707',name:'Omar Ali',cls:'Grade 11A',grade:'78%',status:'Present',fees:'Paid',sc:'badge-blue',fc:'badge-green'},
  {init:'ZI',color:'#7c3aed',name:'Zahra Ibrahim',cls:'Grade 8C',grade:'95%',status:'Active',fees:'Unpaid',sc:'badge-green',fc:'badge-red'},
  {init:'MN',color:'#e03131',name:'Muno Noor',cls:'Grade 12A',grade:'88%',status:'Active',fees:'Paid',sc:'badge-green',fc:'badge-green'},
]

const SCHEDULE = [
  {time:'08:00',color:'#3b5bdb',title:'Mathematics — Grade 10A',sub:'Mr. Hassan · Room 204'},
  {time:'09:30',color:'#0ca678',title:'English Literature — Grade 11B',sub:'Ms. Ayan · Room 108'},
  {time:'11:00',color:'#f76707',title:'Science Lab — Grade 9A',sub:'Mr. Omar · Lab 1'},
  {time:'13:00',color:'#7c3aed',title:'Assembly & Lunch Break',sub:'All classes · Main Hall'},
  {time:'14:00',color:'#e03131',title:'History — Grade 12A',sub:'Ms. Hodan · Room 302'},
  {time:'15:30',color:'#94a3b8',title:'School Dismissal',sub:'All students'},
]

const FEES = [
  {name:'Zahra Ibrahim',cls:'Grade 8C',amount:'$120'},
  {name:'Fatima Mohamed',cls:'Grade 9B',amount:'$60'},
  {name:'Abdi Warsame',cls:'Grade 7A',amount:'$120'},
  {name:'Hodan Ali',cls:'Grade 10B',amount:'$80'},
]

const NOTICES = [
  {tag:'URGENT',tagBg:'var(--red-l)',tagColor:'var(--red)',title:'Final Exams — May 20–30',date:'Posted: 10 May 2025'},
  {tag:'EVENT',tagBg:'var(--blue-l)',tagColor:'var(--blue)',title:'Parent-Teacher Meeting — May 15',date:'Posted: 8 May 2025'},
  {tag:'INFO',tagBg:'var(--green-l)',tagColor:'var(--green)',title:'Summer holiday starts June 15',date:'Posted: 5 May 2025'},
]

const MONTHS  = ['Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May']
const ATTENDANCE = [88,91,87,93,85,96,92,94,91]

export default function App() {
  const [active, setActive] = useState('Dashboard')

  return (
    <div style={{display:'flex'}}>
      {/* SIDEBAR */}
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
          {NAV.map((item,i) =>
            item.section
              ? <div className="sb-section" key={i}>{item.section}</div>
              : (
                <button
                  key={i}
                  className={`sb-item ${active===item.label?'active':''}`}
                  onClick={()=>setActive(item.label)}
                >
                  <span className="sb-icon">{item.icon}</span>
                  {item.label}
                  {item.badge && <span className="sb-badge">{item.badge}</span>}
                </button>
              )
          )}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="main">
        <div className="topbar">
          <div className="topbar-title">Dashboard Overview</div>
          <div className="topbar-right">
            <span className="school-date">📅 Monday, 12 May 2025</span>
            <div className="notif-btn">🔔<div className="notif-dot"></div></div>
            <button className="add-btn">+ Add Student</button>
          </div>
        </div>

        <div className="content">
          {/* STATS */}
          <div className="stats-row">
            {[
              {icon:'🎓',bg:'var(--blue-l)',num:'842',label:'Total Students',change:'+12 ↑',up:true},
              {icon:'👨‍🏫',bg:'var(--green-l)',num:'48',label:'Teachers',change:'+2 ↑',up:true},
              {icon:'✅',bg:'var(--orange-l)',num:'94%',label:'Attendance Today',change:'-3% ↓',up:false},
              {icon:'💰',bg:'var(--purple-l)',num:'$24k',label:'Fees Collected',change:'+8% ↑',up:true},
            ].map((s,i)=>(
              <div className="stat-card" key={i}>
                <div className="sc-top">
                  <div className="sc-icon" style={{background:s.bg}}>{s.icon}</div>
                  <span className={`sc-change ${s.up?'sc-up':'sc-down'}`}>{s.change}</span>
                </div>
                <div className="sc-num">{s.num}</div>
                <div className="sc-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* MID GRID */}
          <div className="mid-grid">
            {/* TABLE */}
            <div className="card">
              <div className="card-head"><h3>Recent Students</h3><button className="card-link">View all →</button></div>
              <table>
                <thead><tr><th>Student</th><th>Class</th><th>Grade</th><th>Status</th><th>Fees</th></tr></thead>
                <tbody>
                  {STUDENTS.map((s,i)=>(
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

            {/* SCHEDULE */}
            <div className="card">
              <div className="card-head"><h3>Today's Schedule</h3><button className="card-link">Full timetable →</button></div>
              <div className="schedule-list">
                {SCHEDULE.map((s,i)=>(
                  <div className="sch-item" key={i}>
                    <div className="sch-time">{s.time}</div>
                    <div className="sch-dot" style={{background:s.color}}></div>
                    <div><div className="sch-title">{s.title}</div><div className="sch-sub">{s.sub}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="bottom-grid">
            {/* CHART */}
            <div className="card">
              <div className="card-head"><h3>Monthly Attendance</h3><button className="card-link">Details →</button></div>
              <div className="chart-wrap">
                <div className="chart-bars">
                  {ATTENDANCE.map((v,i)=>(
                    <div key={i} className="bar-col"
                      style={{height:`${v*0.65}px`,background:i===8?'var(--blue)':'var(--blue-l)'}}
                      title={`${MONTHS[i]}: ${v}%`}
                    />
                  ))}
                </div>
              </div>
              <div className="chart-labels">
                {MONTHS.map((m,i)=><div className="chart-label" key={i}>{m}</div>)}
              </div>
            </div>

            {/* FEES */}
            <div className="card">
              <div className="card-head"><h3>Pending Fees</h3><button className="card-link">Collect →</button></div>
              {FEES.map((f,i)=>(
                <div className="fee-item" key={i}>
                  <div><div className="fee-name">{f.name}</div><div className="fee-class">{f.cls}</div></div>
                  <div className="fee-amount">{f.amount}</div>
                </div>
              ))}
            </div>

            {/* NOTICES */}
            <div className="card">
              <div className="card-head"><h3>Notices &amp; Events</h3><button className="card-link">Post →</button></div>
              {NOTICES.map((n,i)=>(
                <div className="notice-item" key={i}>
                  <span className="notice-tag" style={{background:n.tagBg,color:n.tagColor}}>{n.tag}</span>
                  <div className="notice-title">{n.title}</div>
                  <div className="notice-date">{n.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}