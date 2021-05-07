import React from 'react';
import Handsontable from 'handsontable';
import SettingsMapper from './settingsMapper';

/**
 * A Handsontable-ReactJS wrapper.
 *
 * To implement, use the `HotTable` tag with properties corresponding to Handsontable options.
 * For example:
 *
 * ```js
 * <HotTable root="hot" data={dataObject} contextMenu={true} colHeaders={true} width={600} height={300} stretchH="all" />
 *
 * // is analogous to
 * let hot = new Handsontable(document.getElementById('hot'), {
 *    data: dataObject,
 *    contextMenu: true,
 *    colHeaders: true,
 *    width: 600
 *    height: 300
 * });
 *
 * ```
 *
 * @class HotTable
 */
export default class HotTable extends React.Component {
  constructor() {
    super();

    this.hotInstance = null;
    this.settingsMapper = new SettingsMapper();
    this.root = null;
  }

  /**
   * Initialize Handsontable after the component has mounted.
   */
  componentDidMount() {
    const newSettings = this.settingsMapper.getSettings(this.props);
    this.hotInstance = new Handsontable(document.getElementById(this.root), newSettings);
  }

  /**
 * 
 * @param {boolean} showHeaderOrGrid 
 * @param {string} className 
 * 
 * Fix leftover top and left borders when the grid and headers were hidden.
 */
  hackToFixLeftoverBorders(showHeaderOrGrid, className) {
    const tableNode = document.querySelector('#layoutContainer .handsontable')
    if (showHeaderOrGrid) {
      tableNode.classList.add(className)
    } else {
      tableNode.classList.remove(className)
    }
  }


  /**
   * Call the `updateHot` method and prevent the component from re-rendering the instance.
   *
   * @param {Object} nextProps
   * @param {Object} nextState
   * @returns {Boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    this.hackToFixLeftoverBorders(!nextProps.showGrid, 'hiddenGrid')
    this.hackToFixLeftoverBorders(!nextProps.rowHeaders, 'hiddenHeaders')
    this.updateHot(this.settingsMapper.getSettings(nextProps));
    return false;
  }

  /**
   * Destroy the Handsontable instance when the parent component unmounts.
   */
  componentWillUnmount() {
    this.hotInstance.destroy();
  }

  /**
   * Render the table.
   *
   * @returns {XML}
   */
  render() {
    this.root = this.props.root || 'hot' + new Date().getTime();
    return <div className={this.props.className} id={this.root}></div>
  }

  /**
   * Call the `updateSettings` method for the Handsontable instance.
   * @param newSettings
   */
  updateHot(newSettings) {
    if (!this.hotInstance) return 
    debugger
    this.hotInstance.updateSettings(newSettings);
  }
}
