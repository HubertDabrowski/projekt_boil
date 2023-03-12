const Form = () => {
  return (
    <form>
      <label> Czynność
      <input type="text" />
      </label>
      <label> Czynność bezpośrednio poprzedzająca
      <input type="text" />
      </label>
      <label> Czas trwania
      <input type="number" />
      </label>
    </form>
  );
};

export default Form;