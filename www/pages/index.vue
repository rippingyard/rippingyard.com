<template>
  <div>
    <OrganismBillboard />
    <BlockMain>
      <OrganismPostList :types="['article']" :limit="10" :hideMore="true" />
    </BlockMain>
  </div>
</template>
