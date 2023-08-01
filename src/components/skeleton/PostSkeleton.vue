<template>
  <div>
    <div class="board bg-white text-dark py-1 text-left">
      <!-- Left side -->
      <b-container class="mt-3">
        <div class="d-flex flex-row mt-3 mb-5">
          <b-skeleton class="w-100 h-100"></b-skeleton>
        </div>

        <b-row align-h="between" class="justify-content-start">
          <b-col cols="2">
            <div class="hstack gap-3 h-100">
              <div class="vr"></div>
              <b-skeleton class="w-100 h-100">
                <b-skeleton height="1rem" width="5rem"></b-skeleton>
              </b-skeleton>
            </div>
          </b-col>

          <b-col cols="2" class="d-flex justify-content-end">
            <div>
              <b-skeleton class="w-100 h-100">
                <b-skeleton height="1rem" width="5rem"></b-skeleton>
              </b-skeleton>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <b-container class="py-3">
      <div class="row">
        <div class="col-md-12 mb-4">
          <article>
            <div class="post-content">
              <b-skeleton class="mb-4" height="40px"></b-skeleton>

              <nav style="--bs-breadcrumb-divider: 'ㆍ';" aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <b-skeleton class="breadcrumb-item text-secondary">
                    <b-skeleton height="1rem" width="5rem"></b-skeleton>
                  </b-skeleton>
                  <b-skeleton class="breadcrumb-item text-secondary">
                    <b-skeleton height="1rem" width="5rem"></b-skeleton>
                  </b-skeleton>
                  <li class="breadcrumb-item text-secondary">
                    <b-skeleton height="1rem" width="8rem"></b-skeleton>
                  </li>
                  <b-skeleton class="breadcrumb-item text-secondary">
                    <b-skeleton height="1rem" width="8rem"></b-skeleton>
                  </b-skeleton>
                </ol>
              </nav>

              <b-skeleton height="200px"></b-skeleton>

              <div class="d-flex justify-content-end align-items-center">
                <b-skeleton height="2rem" width="2rem"></b-skeleton>
                <p class="text-dark mb-0 h4"><b-skeleton height="1rem" width="2rem"></b-skeleton></p>
                <b-skeleton height="2rem" width="2rem"></b-skeleton>
              </div>
              <b-skeleton class="d-flex justify-content-end align-items-center" height="30px" width="150px"></b-skeleton>

              <slot></slot>

              <hr class="my-3"/>
            </div>
          </article>
        </div>
      </div>
    </b-container>
  </div>
</template>
