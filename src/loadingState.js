import { ref } from "vue";

const loading = ref(true);
const setLoading = (val) => (loading.value = val);

export { loading, setLoading };
