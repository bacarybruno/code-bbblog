type GaEventArgs = {
  action: Gtag.EventNames;
  category: string;
  label: string;
  value: string;
};

type GaPageViewProps = {
  title?: string;
  location?: string;
  path?: string;
};

export const trackEvent = ({ action, category, label, value }: GaEventArgs) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackPageView = (
  {
    path = window.location.pathname,
    location = window.location.href,
    title = document.title,
  }: GaPageViewProps = {
    location: window.location.href,
    path: window.location.pathname,
    title: document.title,
  }
) => {
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: location,
    page_title: title,
  });
};
