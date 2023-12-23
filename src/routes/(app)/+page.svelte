<script lang="ts">
    let a = $state(1);

    function bb() {
        a += 1;
    }
</script>

<button on:click={bb}>bb</button>
<span>{a}</span>