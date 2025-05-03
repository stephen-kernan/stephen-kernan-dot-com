import Mixpanel from 'mixpanel'
import { AnalyticsEvent } from '@/events/types'
import { Singleton } from '@/utils/Singleton'

const MIXPANEL_TOKEN = process.env.MIXPANEL_TOKEN ?? 'no-token'

export class AnalyticsClient extends Singleton<Mixpanel.Mixpanel> {
  constructor() {
    super('analyticsClient')
    if (!this.value) {
      this.value = Mixpanel.init(MIXPANEL_TOKEN, { geolocate: false })
    }
  }

  track = (event: AnalyticsEvent) => {
    const client = this.value as Mixpanel.Mixpanel
    client.track(event.name, event.properties)
  }
}
