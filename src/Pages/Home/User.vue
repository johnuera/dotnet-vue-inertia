<script setup lang="ts">
defineProps<{ id: Number , title:string   }>();
 import { route } from "../../js/ziggy";
import { Head } from "@inertiajs/vue3";

 </script>

<template>

<Head>
    <title>{{ title }} - {{id}}</title>
    <meta name="description" :content="`User for id - ${1}`">
</Head>

  <main style="padding: 24px">
    <h1>This is User {{ id }}</h1>
   <div class="p-6">
      <Link :href="route('default')" class="btn btn-primary">         {{ $t("return") }}
</Link>
    </div>
  </main>
</template>
