import { useState, useEffect } from 'react';

export default function Input() {
  const [agenda, setAgenda] = useState([]);
  const [formData, setFormData] = useState({
    nama: '',
    jpu: '',
    agenda: '',
  });

  const today = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  useEffect(() => {
    if (!agenda.length && localStorage.getItem('agenda')) {
      setAgenda(JSON.parse(localStorage.getItem('agenda')));
    }
    if (agenda.length) {
      localStorage.setItem('agenda', JSON.stringify(agenda));
    }
  }, [agenda]);

  const handleFormChange = (e) => {
    const { value, id } = e.target;
    setFormData((previous) => {
      return {
        ...previous,
        [id]: value,
      };
    });
  };

  const handleDeleteItem = (id) => {
    const filteredAgenda = agenda.filter((e) => e.id !== id);
    if (filteredAgenda.length) {
      setAgenda(filteredAgenda);
    } else {
      localStorage.removeItem('agenda');
      setAgenda([]);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const payload = {
      id: agenda.length + 1,
      ...formData,
      date: today,
    };

    setAgenda((previous) => {
      return [...previous, payload];
    });

    setFormData({
      nama: '',
      jpu: '',
      agenda: '',
    });
  };

  return (
    <div className='container pt-5'>
      <h1 className='text-center pb-4'>Input Agenda</h1>

      <h3 className='text-capitalize text-center mb-5'>
        Hari/tgl : {today.toLocaleDateString('id-ID', options)}
      </h3>
      <form onSubmit={handleSubmitForm} className='w-50 mx-auto mb-5'>
        <div className='mb-3'>
          <label htmlFor='nama' className='form-label'>
            Nama
          </label>
          <input
            type='text'
            onChange={handleFormChange}
            className='form-control'
            id='nama'
            value={formData.nama}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='jpu' className='form-label'>
            JPU
          </label>
          <input
            type='text'
            onChange={handleFormChange}
            className='form-control'
            id='jpu'
            value={formData.jpu}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='agenda' className='form-label'>
            Agenda
          </label>
          <input
            type='text'
            onChange={handleFormChange}
            className='form-control'
            id='agenda'
            value={formData.agenda}
            required
          />
        </div>
        <div className='mb-3 text-end'>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </form>

      <table className='table table-bordered mt-5'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Nama</th>
            <th scope='col'>JPU</th>
            <th scope='col'>Agenda</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {agenda &&
            agenda.map((el, i) => {
              return (
                <tr key={i}>
                  <th scope='row'>{i + 1}</th>
                  <td>{el.nama}</td>
                  <td>{el.jpu}</td>
                  <td>{el.agenda}</td>
                  <td className='text-center'>
                    <button onClick={() => handleDeleteItem(el.id)}>
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
