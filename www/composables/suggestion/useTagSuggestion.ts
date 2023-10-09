import { SuggestionOptions } from '@tiptap/suggestion';
import { VueRenderer } from '@tiptap/vue-3';
import tippy from 'tippy.js';
import { GetReferenceClientRect } from 'tippy.js';
import TagList from '~~/components/form/TagList/index.vue';

type ClientRect = GetReferenceClientRect | null;

export const useTagSuggestion = () => {

  let component: VueRenderer;
  let popup: ReturnType<typeof tippy>;

  const entities = [
    'Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder', 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John', 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey', 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',
  ];

  const items = computed(() => entities.filter(e => e.toLowerCase().startsWith(query.value.toLowerCase())).slice(0, 5));
  const query = ref<string>('');

  const suggestion: Omit<SuggestionOptions, 'editor'> = {
    char: '#',
    items: ({ query: q }) => {
      query.value = q;
      return items.value;
    },
    render: () => {
      return {
        onStart: props => {
          component = new VueRenderer(TagList, {
            props,
            editor: props.editor,
          });

          if (!props.clientRect) return;

          popup = tippy('body', {
            getReferenceClientRect: props.clientRect as ClientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
          });
        },
        onUpdate(props) {
          component.updateProps(props);
          if (!props.clientRect) return;
          popup[0].setProps({
            getReferenceClientRect: props.clientRect as ClientRect,
          });
        },
        onKeyDown(props) {
          if (props.event.key === 'Escape') {
            popup[0].hide();
            return true;
          }
          return component.ref?.onKeyDown(props);
        },
        onExit() {
          popup[0].destroy()
          component.destroy()
        },
      }
    },
  }

  return {
    suggestion,
  }
}