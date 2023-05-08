<template>
  <form @submit.prevent>
    <div class="uk-margin">
      <label class="uk-form-label" for="name">Имя</label>

      <div class="uk-form-controls">
        <input
          v-model="form.name"
          required
          id="name"
          class="uk-input"
          type="text"
          placeholder="Введите ваше имя"
        />
      </div>
    </div>

    <div class="uk-margin">
      <label class="uk-form-label" for="comment">Комментария</label>

      <div class="uk-form-controls">
        <textarea
          v-model="form.comment"
          required
          id="comment"
          class="uk-textarea"
          placeholder="Введите текст"
          rows="4"
        />
      </div>
    </div>

    <div class="uk-margin-medium-bottom">
      <label class="uk-form-label" for="name">Количество запросов</label>

      <div class="uk-form-controls">
        <input
          v-model="form.count"
          required
          min="1"
          max="1000"
          id="name"
          class="uk-input"
          type="number"
          placeholder="Введите количество запросов"
        />
      </div>
    </div>

    <button
      v-if="interval"
      class="uk-button uk-button-danger uk-width"
      @click="onStop"
    >
      Остановить
    </button>

    <button
      v-else
      class="uk-button uk-button-secondary uk-width"
      @click="onSend"
    >
      Отправить
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const interval = ref<number | null>(null);

const form = ref({
  name: "",
  comment: "",
  count: 10,
});

const requestCount = computed<number[]>(() => {
  const result = [];
  for (let i = 10; i <= 1000; i += 10) result.push(i);
  return result;
});

const onSend = () => {
  const valid =
    Object.values(form.value).filter(
      (value: string | number) => value?.toString()?.trim()?.length
    ).length === Object.keys(form.value).length;

  if (valid) {
    let count = 0;
    let data = new FormData();

    data.append("name", form.value.name);
    data.append("comment", form.value.comment);

    interval.value = setInterval(() => {
      count++;

      fetch("https://560a-82-215-96-33.ngrok-free.app/api/comment/store", {
        method: "post",
        body: data,
      }).then((response) => console.log(response));

      if (count === form.value.count) onStop();
    }, 0);
  }
};

const onStop = () => {
  if (interval.value) clearInterval(interval.value);
  interval.value = null;
};
</script>
