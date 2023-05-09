<script setup lang="ts"></script>

<template>
  <div>
    <div
      uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky"
    >
      <nav class="uk-navbar-container">
        <div class="uk-container">
          <div uk-navbar>
            <div class="uk-navbar-left">
              <ul class="uk-navbar-nav">
                <li>
                  <RouterLink exact-active-class="uk-text-primary" to="/">
                    Форма запроса
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    exact-active-class="uk-text-primary"
                    to="/comments"
                  >
                    Список комментариев
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <RouterView />
  </div>
</template>
