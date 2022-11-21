import {useState, useEffect} from 'react'
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";

function App() {

  const [pacientes, setPacientes] = useState ([]);
  const [paciente, setPaciente] = useState ({});

//El orden en que los vayas definiendo es el orden en el que se ejecutan =>
  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];  //si no hay nada en localStorage, entonces agregale un arreglo vacío
      setPacientes(pacientesLS);
    }
    obtenerLS();
  }, []); //este 'useEffect' obtendrá lo que haya en el localstorage


  useEffect (() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])  //para no perder datos al actualizar la pag y se almacena en el localstorage 

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id); //filter, nos va a permitir sacar un elemento del arreglo
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="nt-12 md:flex">
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <Listado
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
      
    </div>
  )
}

export default App
