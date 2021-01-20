/**
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 */

import { LayerEventType } from './EventType'
import Event from './Event'

const { Cesium } = DC.Namespace

class LayerEvent extends Event {
  constructor() {
    super()
  }

  /**
   * Register event for layer
   * @private
   */
  _registerEvent() {
    Object.keys(LayerEventType).forEach((key) => {
      let type = LayerEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default LayerEvent
