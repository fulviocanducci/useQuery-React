import { useForm } from "react-hook-form";
import { usePost } from "./hooks/posts";
import { IPost } from "./@types";

function App() {
  const { useMutationPostInsert, useResultQueryPost } = usePost();
  const { data, isLoading } = useResultQueryPost();
  const { mutateAsync } = useMutationPostInsert();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IPost>({
    mode: "onChange",
  });

  const onSubmit = async (data: IPost) => {
    await mutateAsync(data);
    reset();
  };

  return (
    <div className="container">
      <div className="mt-1 mb-3">
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <div className="form-group mb-1">
            <label className="form-label mb-0" htmlFor="description">
              Descrição
            </label>
            <input type="text" id="description" className="form-control form-control-sm" {...register("description", { required: true })} autoFocus />
            {errors.description && <span className="text-danger">Descrição é obrigatória</span>}
          </div>
          <div className="form-group mb-1">
            <button type="submit" className="btn btn-sm btn-primary w-100" disabled={!isValid}>
              Salvar
            </button>
          </div>
        </form>
      </div>
      {isLoading && <div>Carregando ...</div>}
      {isLoading === false && data?.length === 0 && (
        <div className="alert alert-danger alert-sm" role="alert">
          Nenhum resultado encontrado
        </div>
      )}
      <div className="row mt-1 mb-3">
        {data && data.length > 0 && (
          <div className="col-md-12 text-end text-primary mb-2">
            <small className="fst-italic"> Quantidade: {data?.length || 0}</small>
          </div>
        )}
        {data?.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div className="shadow-sm p-3 mb-3 bg-body rounded">
              <div className="text-primary border-bottom mb-2">{item.description}</div>
              <small className="fst-italic">{item.id}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
