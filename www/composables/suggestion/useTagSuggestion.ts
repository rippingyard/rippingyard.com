import { SuggestionKeyDownProps, SuggestionOptions } from '@tiptap/suggestion';
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

  const query = ref<string>('');
  const items = ref<string[]>([]);
  const selectedIndex = ref<number>(0);

  watchEffect(() => items.value = entities.filter(e => e.toLowerCase().startsWith(query.value.toLowerCase())).slice(0, 5));

  const selectItem = (index: number) => {
    const item = items.value[index];

    // if (item) {
    //   props.command({ id: item });
    // }
  };

  const onKeyDown = ({ event }: SuggestionKeyDownProps) => {

    console.log('event', event);

    if (event.key === 'ArrowUp') {
      upHandler();
      return true;
    }

    if (event.key === 'ArrowDown') {
      downHandler();
      return true;
    }

    if (event.key === 'Enter') {
      enterHandler();
      return true;
    }

    if (event.key === 'Escape') {
      popup[0].hide();
      return true;
    }

    return false;
  };

  const upHandler = () => {
    selectedIndex.value = ((selectedIndex.value + items.value.length) - 1) % items.value.length
  };

  const downHandler = () => {
    selectedIndex.value = (selectedIndex.value + 1) % items.value.length
  };

  const enterHandler = () => {
    selectItem(selectedIndex.value);
  };

  const suggestion: Omit<SuggestionOptions, 'editor'> = {
    char: '#',
    items: ({ query: q }) => {
      query.value = q;
      return items.value;
    },
    render: () => {
      return {
        onStart: props => {
          console.log('onStart', props.command)
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
          console.log('props', props);
          return onKeyDown(props);
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
    items: items.value,
    selectedIndex: selectedIndex.value,
  }
}