<template>
  <div class="board bg-white text-dark py-1 text-left">
    <b-container class="mt-3">
      <div class="d-flex flex-row mt-3 mb-5">
        <b-button variant="secondary" size="sm" @click="$router.push({name: 'Boards'})">
          <i class="fa-solid fa-arrow-left"></i> 나가기
        </b-button>
      </div>
      <div class="hstack gap-3">
        <div class="vr"></div>
        <b-strong>카테고리</b-strong>
      </div>
    </b-container>
  </div>

  <b-container class="py-3">
    <div class="row">
      <div class="col-md-12 mb-4">
        <article>
          <div class="post-content">
            <h2 class="title mb-4">제목</h2>

            <nav style="--bs-breadcrumb-divider: 'ㆍ';" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item text-secondary">작성자</li>
                <li class="breadcrumb-item text-secondary">작성일</li>
                <li class="breadcrumb-item text-secondary">댓글 3개</li>
              </ol>
            </nav>

            <slot></slot>

            <p class="mt-5 mb-lg-5">글 내용</p>

            <div class="d-flex justify-content-end align-items-center">
              <i class="btn bi bi-chevron-up mx-2 icon-1x"></i><p class="text-dark mb-0 h4">3</p><i class="btn ms-2 bi-chevron-down icon-1x"></i>
            </div>

            <hr class="my-4"/>
          </div>
        </article>
      </div>
    </div>
  </b-container>
</template>