import { useState, useEffect } from 'react';

import logo from './logo.png';
import './App.css';

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
      <table className='table table-bordered mt-5'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Nama</th>
            <th scope='col'>Pasal Dakwaan</th>
            <th scope='col'>JPU</th>
            <th scope='col'>Hakim</th>
            <th scope='col'>Agenda</th>
          </tr>
        </thead>
        <tbody>
          {agenda &&
            agenda.map((el, i) => {
              return (
                <tr key={i}>
                  <th scope='row'>{i + 1}</th>
                  <td>{el.nama}</td>
                  <td>{el.pasalDakwaan}</td>
                  <td>{el.jpu}</td>
                  <td>{el.hakim}</td>
                  <td>{el.agenda}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
