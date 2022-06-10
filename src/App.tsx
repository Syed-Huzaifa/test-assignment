import { Autocomplete } from '~/components';
import { COUNTRIES } from '~/global';

const App = () => {
  return (
    <div className="App">
      <div>
        <Autocomplete
          options={COUNTRIES}
          id="myInput"
          placeholder="Country"
          onChange={value => {
            console.log(value);
          }}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <Autocomplete
          options={['Test 1', 'Huzaifa']}
          id="myInput1"
          placeholder="Names"
          onChange={value => {
            console.log(value);
          }}
        />
      </div>
    </div>
  );
};

export default App;
