import React,{useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';
interface Plants
{
  id:number,
  plantName:string;
  plantType:string;
  plantEnergyOutput:string;
  Maintanence:string;
  Locationstatus:string;
}
const API_URL = 'http://localhost:2001/plants';

function Energy() {
  const [plants, setPlants] = useState<Plants[]>([]);
  const [plant , setPlant] = useState<Omit<Plants, 'id'>>({
    plantName: '',
    plantType: '',
    plantEnergyOutput: '',
    Maintanence: '',
    Locationstatus: '',
  });
  const[isEditing, setIsEditing] = useState<boolean>(false);
  const[setplantId, setPlantId] = useState<number>(0);
  const[searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await axios.get<Plants[]>(API_URL);
      setPlants(response.data);
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  };
  const Handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${setplantId}`, plant);
      } else {
        await axios.post(API_URL, plant);
      }
      setPlant({
        plantName: '',
        plantType: '',
        plantEnergyOutput:'',
        Maintanence: '',
        Locationstatus: '',
      });
      fetchPlants();
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving plant:', error);
    }   
  };
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPlants();
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };
  const handleEdit = (id: number) => {
    const plantToEdit = plants.find((plant) => plant.id === id);
    if (plantToEdit) {
      setPlant(plantToEdit);
      setIsEditing(true);
      setPlantId(id);
    }
  };
  return (
    <>
    <div className='image'>
     <div className="navbar">
      <h1>Energy</h1>
      <div className="navlinks">
        <a href="/">Home</a>
        <a href="/energy">Energy</a>
        <a href="/solar">Solar</a>
      </div>
    </div>
    <div className="App">
      <h1>Power plant Details</h1>
      
       
      <form onSubmit={Handlesubmit} className="form">
        <table >
          <tr>
            <td>
              <label>PlantName:</label>
            </td>
            <td>
            <input type="text"
          placeholder="Plant Name"
          value={plant.plantName}
          onChange={(event) => setPlant({ ...plant, plantName: event.target.value })}
        required />
            </td>
          </tr>
    
        <tr>
          <td><label>Plant Type:</label></td>
          <td> <input
          type="text"
          placeholder="Plant Type"
          value={plant.plantType}
          onChange={(event) => setPlant({ ...plant, plantType: event.target.value })}
        required/></td>
        </tr>
      
          <tr>
            <td><label>Energy:</label>
            </td>
            <td>
            <input
          type="text"
          placeholder="Plant Energy Output"
          value={plant.plantEnergyOutput}
          onChange={(event) => setPlant({ ...plant, plantEnergyOutput: (event.target.value) })}
            required />
            </td></tr>
            
    
        <tr>
          <td>
            <label>Maintanence status:</label>
          </td>
          <td>
          <input
          type="text"
          placeholder="Maintanence status"
          value={plant.Maintanence}
          onChange={(event) => setPlant({ ...plant, Maintanence: event.target.value })}
        required/>
          </td>
        </tr>
        <tr>
          <td>
            <label>Location:</label>
          </td>
          <td>
          <input
          type="text"
          placeholder="Location"
          value={plant.Locationstatus}  
          onChange={(event) => setPlant({ ...plant, Locationstatus: event.target.value })}
        required/>  
          </td>
        </tr>
       <td>
      
       </td>
       <td>
       <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
       </td>
       
       
        </table>
      </form>
      <div className="searchbar">
      <input
        type="text"
        placeholder="Search by Plant Name"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      </div>
      </div>

       <div className="output">
       <table>
        <thead>
          <tr>
            <th>Plant Name</th>
            <th>Plant Type</th>
            <th>Plant Energy Output</th>
            <th>Maintanence</th>
            <th>Location Status</th>            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plants.filter((plant) => plant.plantName.toLowerCase().includes(searchTerm.toLowerCase())).map((plant) => (
            <tr key={plant.id}>
              <td>{plant.plantName}</td>
              <td>{plant.plantType}</td>
              <td>{plant.plantEnergyOutput}</td>
              <td>{plant.Maintanence}</td>
              <td>{plant.Locationstatus}</td>
              <td>
                <button onClick={() => handleEdit(plant.id)} id="edit">Edit</button>
                <button onClick={() => handleDelete(plant.id)} id="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
            
       </div>
      <div className="footer">@2023 Energy</div>
     
         
    </div>
    </>
  );
}
export default Energy;
