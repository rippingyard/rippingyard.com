import { SuggestionOptions } from '@tiptap/suggestion';
import { VueRenderer } from '@tiptap/vue-3';
import { useEntities } from '~~/composables/fetch/useEntities';
import tippy from 'tippy.js';
import { GetReferenceClientRect } from 'tippy.js';
import TagList from '~~/components/form/TagList/index.vue';
import { useEntityId } from '~~/composables/utils/useEntityId';

type ClientRect = GetReferenceClientRect | null;

export type EntityType = {
  name: string;
  id: string | null;
}

export const useTagSuggestion = () => {

  let component: VueRenderer;
  let popup: ReturnType<typeof tippy>;

  const { data, refresh } = useEntities({
    where: [
      { key: 'type', val: 'tag' }
    ],
  });

  const entities: EntityType[] = (data.value || []).map(e => {
    return {
      name: e.name,
      id: e.id,
    }
  });
  console.log('entities', entities);

  const items = computed<EntityType[]>(() => {
    if (!query.value) return [];
    const items = entities.filter(e => e.name.toLowerCase().startsWith(query.value.toLowerCase())).slice(0, 5);
    return [
      ...items,
      {
        name: query.value,
        id: useEntityId(query.value, 'tag'),
      },
    ]
  });
  const query = ref<string>('');

  const suggestion: Omit<SuggestionOptions<EntityType>, 'editor'> = {
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
    refresh,
  }
}