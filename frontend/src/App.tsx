import { useState, useEffect } from "react"; 
import StudentList from "./components/StudentList"; 
import AddStudentForm from "./components/AddStudentForm"; 
import type { Student, LoadingStatus } from "./types/student"; 
import { fetchStudents } from "./api/students"; 
import "./App.css"; 
 
function App() { 
   
  // ✅ TypeScript Konzept: useState mit Array-Typisierung 
  const [students, setStudents] = useState<Student[]>([]); 
   
  // ✅ Konzept: Union Type für Status 
  const [status, setStatus] = useState<LoadingStatus>('idle'); 
   
  // ✅ Konzept: Optionaler Wert 
  const [error, setError] = useState<string | undefined>(undefined); 
 
  // ✅ Konzept: Async Funktion typisieren 
  const loadStudents = async (): Promise<void> => { 
    setStatus('loading'); 
    setError(undefined); 
     
    try { 
      const data: Student[] = await fetchStudents(); 
      setStudents(data); 
      setStatus('idle'); 
    } catch (err: unknown) { 
      // ✅ Konzept: unknown Type prüfen 
      if (err instanceof Error) { 
        setError(err.message); 
      } else { 
        setError("Fehler beim Laden der Studenten"); 
      } 
      setStatus('error'); 
    } 
  }; 
 
  // Beim ersten Laden 
  useEffect(() => { 
    loadStudents(); 
  }, []); 
 
  return ( 
    <div className="app"> 
      <h1>📚 Studenten-Notenverwaltung</h1> 
       
      {status === 'loading' && <div className="loading">Laden...</div>} 
       
      <AddStudentForm onStudentAdded={loadStudents} /> 
       
      <StudentList students={students} error={error} /> 
    </div> 
  ); 
} 
 
export default App;
