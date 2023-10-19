<template>
<section id="log" class="battle-log text-center">

  <div class="modal fade" id='exampleModal' tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <ul class="list-group">
                <li class=list-group-item v-for="(item, indx) in body" :key="indx">
                 {{ item.name ? item.name : 'Unknown'}} - {{ item.result }}
                </li>
            </ul>
          </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

  </section>

</template>
<script setup lang="ts">

defineProps({
    title: {
        type: String
    },
    body: {
        type: []
    },
    target: {
      type: String
    }
})
</script>
