<template>
  <div>
    <BlockMain :is-cliff="true">
      <BlockLoading :is-loading="isLoading" :is-error="isError" :error="error">
        <BlockWysiwyg :content="content" :is-article="true" />
        <AdPostBottom />
        <div class="footer">
          <p class="date">
            <IconClock />{{ seed?.published_at }}
          </p>
        </div>
      </BlockLoading>
    </BlockMain>
    <OrganismBillboard />
    <!-- <div class="frame">
    <aside class="extra related">
      <div class="heading">
        <h2><span class="border">関連記事</span></h2>
      </div>
      <RelatedArticles :tags="post.entities" :exclude-id="post.id" />
    </aside>
  </div> -->
  </div>
</template>
<script lang="ts" setup>
import { useSeeds } from '~~/composables/fetch/useSeeds';
import { useContentFilter } from '~~/composables/filter/useContentFilter';
import { Seed } from '~~/schemas/seed';

const route = useRoute();
const { data: seeds, isLoading, isError, error } = useSeeds();

const slug = route.params.slug as string;
const seed = computed<Seed>(() => seeds.value?.find((s: Seed) => s.slug === slug));

const title = computed(() => seed.value?.title ? `<h1>${seed.value.title}</h1>` : '');
const body = computed(() => seed.value?.body || '');
const content = ref('');

watchEffect(() => {
  content.value = useContentFilter(title?.value + body?.value).value;
});

//   computed: {
//     getName() {
//       switch (this.post.user) {
//         case 37:
//           return 'labofromjmq'

//         case 24:
//           return 'compuedit'

//         case 4:
//           return 'joynesan'

//         case 3:
//           return 'komugi'

//         case 2:
//           return 'mcatm'

//         default:
//           return 'ripping yard'
//       }
//     },
//   },
//   async mounted() {
//     const slug = this.$route.params.slug

//     if (!slug) this.redirect('/')

//     const storage = this.$fire.storage
//     const pathref = storage.ref('seeds/seeds.json')

//     const url = await pathref.getDownloadURL()
//     const res = await axios.get(url)

//     const Seeds = res.data

//     const seed = Seeds.find(s => {
//       return s.slug === slug
//     })

//     if (!seed) {
//       this.error({ statusCode: 404, message: 'ページが見つかりません' })
//     }

//     this.post = {
//       title: seed.title,
//       content: seed.body,
//       user: seed.user_id,
//       publishedAt: seed.published_at,
//     }
//   },
//   head: context => {
//     return {
//       title: context.post.title,
//     }
//   },
// }
</script>
<style lang="scss" scoped>
.heading {
  margin-bottom: $gap;

  h1 {
    font-size: 2.2rem;
    line-height: 1.4;
    font-weight: 800;
    padding-top: 3rem;
  }

  h2 {
    font-size: 1.4rem;
    line-height: 1.4;
    font-weight: 800;
    padding-top: 2.2rem;
  }

  h1,
  h2 {
    .border {
      display: inline-block;
      padding-bottom: 2px;
      border-bottom: 4px solid $black;
    }
  }

  .extra & {
    margin-bottom: $gap * 0.5;
  }
}

.footer {
  padding: 80px 0;
  font-size: 0.9rem;
  color: $gray-black;
  font-weight: 800;
  position: relative;

  &::before {
    content: '';
    width: 18px;
    height: 1px;
    background-color: $gray-black;
    top: 70px;
    left: 0;
    display: block;
    position: absolute;
  }

  >p {
    display: inline-block;

    .icon {
      margin-right: 5px;
    }
  }
}
</style>
