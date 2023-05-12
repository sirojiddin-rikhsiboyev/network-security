<template>
  <div class="uk-container">
    <div class="form-container" uk-height-viewport="expand: true">
      <div class="uk-card uk-card-default uk-card-body uk-width">
        <div v-if="loading" class="uk-text-center" style="color: gray">
          Загрузка...
        </div>

        <div
          v-else-if="comments?.length"
          class="uk-flex uk-flex-column"
          style="gap: 1rem"
        >
          <div v-for="(comment, idx) in comments" :key="comment.id" class="">
            <p class="uk-text-normal uk-margin-remove uk-text-bold">
              {{ idx + 1 }}) {{ comment.name }}
            </p>

            <p class="uk-margin-remove">{{ comment.comment }}</p>

            <p class="uk-margin-remove uk-text-small" style="color: gray">
              {{ dateFormatter(comment.created_at) }}
            </p>
          </div>
        </div>

        <div v-else class="uk-text-center" style="color: gray">Список пуст</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { format } from "date-fns";
import { baseUrl } from "@/data/consts";

interface IComment {
  id: number;
  name: string;
  comment: string;
  created_at: string;
}

const comments = ref<IComment[]>([]);
const loading = ref<boolean>(false);

const dateFormatter = (value: string) =>
  format(new Date(value), "dd.MM.yyyy HH:mm:ss");

onMounted(() => {
  loading.value = true;
  fetch(baseUrl + "/api/comment/list")
    .then((response) => response.json())
    .then((record) => (comments.value = record?.data?.reverse() || []))
    .finally(() => (loading.value = false));
});
</script>
