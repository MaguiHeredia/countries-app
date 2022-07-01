// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


import Activity, {validate}  from '../src/components/Containers/activity';

describe('Validacion: ', () => {
  it('validate debe devolver un objeto con un error si el name esta vacio:', () => {
    expect(validate({
      name: ''
    })).toEqual({name: 'Name is required'});
  });
  it('validate debe devolver un objeto con un error si el name no es valido:', () => {
    expect(validate({
      name: 'dassadas1_ as'
    })).toEqual({name: "Only letters are allowed"});
  });
})


