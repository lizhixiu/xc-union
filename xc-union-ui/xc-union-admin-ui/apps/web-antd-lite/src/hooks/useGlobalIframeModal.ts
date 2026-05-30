import { markRaw, reactive } from 'vue';
type OpenOptions = {
  height?: number | string;
  mode?: 'drawer' | 'modal';
  placement?: 'bottom' | 'left' | 'right' | 'top';
  props?: Record<string, any>;
  src?: string;
  title?: string;
  width?: number | string;
};

const state = reactive({
  open: false,
  title: '',
  src: '',
  // 将默认宽度改为 80vw，确保宽度至少占视口的 80%
  width: '80vw' as number | string,
  height: '80vh' as number | string,
  loading: false,
  isIframe: true,
  component: undefined as any,
  componentProps: {} as Record<string, any>,
  mode: 'modal' as 'drawer' | 'modal',
  placement: 'right' as 'bottom' | 'left' | 'right' | 'top',
});

const modules = import.meta.glob('/src/**/*.vue');

function normalizeToSrcPath(input: string) {
  if (!input) return '';
  if (input.startsWith('/src/')) return input;
  const idx = input.indexOf('/src/');
  if (idx !== -1) return input.slice(idx);
  return input;
}

function open(options: OpenOptions = {}) {
  state.title = options.title ?? '';
  // 使用传递的宽度，如果没有则使用默认值 '80vw'
  state.width = options.width ?? '80vw';
  state.height = options.height ?? '80vh';
  state.componentProps = options.props ?? {};
  state.mode = options.mode ?? 'modal';
  state.placement = options.placement ?? 'right';
  const src = options.src ?? '';
  state.loading = true;

  const isHttp = /^https?:\/\//.test(src);
  if (isHttp) {
    state.isIframe = true;
    state.src = src;
    state.open = true;
    state.loading = false;
    return;
  }

  const key = normalizeToSrcPath(src);
  const importer = modules[key];
  if (importer) {
    state.isIframe = false;
    state.src = '';
    importer()
      .then((mod: any) => {
        state.component = markRaw(mod.default ?? mod);
        state.open = true;
      })
      .catch((error) => {
        console.error('Failed to load component:', error);
        state.component = undefined;
        state.open = true;
      })
      .finally(() => {
        state.loading = false;
      });
  } else {
    state.isIframe = false;
    state.component = undefined;
    state.loading = false;
    state.open = true;
  }
}

function close() {
  state.open = false;
  state.loading = false;
  state.src = '';
  state.component = undefined;
}

function setLoading(v: boolean) {
  state.loading = v;
}

export function useGlobalIframeModal() {
  return { state, open, close, setLoading };
}
