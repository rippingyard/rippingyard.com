const preventDefaultEvent = (e: any) => {
  e.preventDefault();
}

export const useScrollLock = () => {

  // modern Chrome requires { passive: false } when adding event
  let supportsPassive = false;
  try {
    window.addEventListener('check', () => undefined, Object.defineProperty({}, 'passive', {
      get() { supportsPassive = true; }
    }));
  } catch (e) {};

  const wheelEvent: keyof WindowEventMap = 'onwheel' in window.document.createElement('div') ? 'wheel' : 'wheel';
  const wheelOpt: boolean | EventListenerOptions | undefined = supportsPassive ? { capture: false } : false;

  /**
   * スクロールを禁止する
   */
  const disableScroll = () => {
    window.addEventListener(wheelEvent, preventDefaultEvent, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefaultEvent, wheelOpt); // mobile
  }

  /**
   * スクロールを許可する
   */
  const enableScroll = () => {
    window.removeEventListener(wheelEvent, preventDefaultEvent, wheelOpt);
    window.removeEventListener('touchmove', preventDefaultEvent, wheelOpt);
  }

  return { enableScroll, disableScroll }
}