import { ref } from "vue";

const loading = ref(true);
const setLoading = (val: boolean) => (loading.value = val);

export { loading, setLoading };
