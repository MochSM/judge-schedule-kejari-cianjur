import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

import logo from './logo.png';
import './App.css';

const columns = [
  {
    name: 'Nama',
    selector: (row) => row.nama,
    sortable: true,
  },
  {
    name: 'JPU',
    selector: (row) => row.jpu,
    sortable: true,
  },
  {
    name: 'Agenda',
    selector: (row) => row.agenda,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
];
function App() {
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    if (!agenda.length && localStorage.getItem('agenda')) {
      const fetchAgenda = JSON.parse(localStorage.getItem('agenda'));
      const todayAgenda = fetchAgenda.filter((el) => {
        const date = new Date(el.date);
        return (
          date.toLocaleDateString().split('T')[0] ===
          today.toLocaleDateString().split('T')[0]
        );
      });
      setAgenda(todayAgenda);
    }
  }, []);

  const today = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <div className='App container'>
      <div className='row'>
        <div className='col-4'>
          <img
            src={logo}
            className='my-4'
            style={{ height: '200px' }}
            alt='logo'
          />
        </div>
        <div className='col-8 m-auto'>
          <h1 className='text-capitalize mt-5 mb-3'>
            Agenda jadwal sidang kejaksaan negeri cianjur
          </h1>
          <h3 className='text-capitalize mb-5'>
            Hari/tgl : {today.toLocaleDateString('id-ID', options)}
          </h3>
        </div>
      </div>
      <div className='mt-5'>
        <DataTable columns={columns} data={agenda} />
      </div>
    </div>
  );
}

export default App;
