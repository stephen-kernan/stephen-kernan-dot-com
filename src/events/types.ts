/* eslint no-unused-vars: 0 */
export enum EventName {
  PageViewEvent = 'page_view',
  ClickEvent = 'click_event',
  ViewEvent = 'view_event',
  ModalOpened = 'modal_opened',
  ModalClosed = 'modal_closed',
  FormSubmitted = 'form_submitted',
  FormCancelled = 'form_cancelled',
  NavExpanded = 'nav_expanded',
  DemoOpened = 'demo_opened',
  DemoClosed = 'demo_closed',
  DemoFeatureToggled = 'demo_feature_toggled',
}

export interface EventProperties {
  distinct_id: string
  path: string
  ip?: string
  [key: string]: unknown
}

export interface AnalyticsEvent {
  name: EventName
  properties: EventProperties
}
