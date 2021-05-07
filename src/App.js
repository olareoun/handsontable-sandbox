import React from 'react';
import HotTable from './react-handsontable'
import 'handsontable/dist/handsontable.full.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      ["", "Ford", "Volvo", "Toyota", "Honda"],
      ["aasd fas fsa fsaf sa fsa", 10, 11, 12, 13],
      ["aasd fas fsa fsaf sa fsa", 20, 11, 14, 13],
      ["c", 30, 15, 12, 13]
    ];
  }

  render() {
    return (
      <div id="hot-app">
        <HotTable
          data={this.data}
          colHeaders={true}
          rowHeaders={true}
          colWidths="100"
          autoColumnSize={false}
          manualColumnResize
          manualRowResize
          width="600"
          height="300"
          stretchH="none"
        />
      </div>
    );
  }
}

export default App