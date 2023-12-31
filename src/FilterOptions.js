const FilterOptions = ({ handleFilter }) => {
  return (
    <div>
      <div>
        <h3>Gender</h3>
        <label>
          <input
            type="checkbox"
            name="gender"
            value="Men"
            onChange={handleFilter}
          />
          Men
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="gender"
            value="Women"
            onChange={handleFilter}
          />
          Women
        </label>
      </div>
      <div>
        <h3>Color</h3>
        <label>
          <input
            type="checkbox"
            name="color"
            value="Red"
            onChange={handleFilter}
          />
          Red
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="color"
            value="Black"
            onChange={handleFilter}
          />
          Black
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="color"
            value="Blue"
            onChange={handleFilter}
          />
          Blue
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="color"
            value="Green"
            onChange={handleFilter}
          />
          Green
        </label>
      </div>
      <div>
        <h3>Price</h3>
        <label>
          <input
            type="checkbox"
            name="price"
            value="0-250"
            onChange={handleFilter}
          />
          $ 0-250
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="price"
            value="251-450"
            onChange={handleFilter}
          />
          $ 251-450
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="price"
            value="451-1000"
            onChange={handleFilter}
          />
          $ 451-1000
        </label>
      </div>
      <div>
        <h3>Type</h3>
        <label>
          <input
            type="checkbox"
            name="type"
            value="Hoodie"
            onChange={handleFilter}
          />
          Hoodie
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="type"
            value="Polo"
            onChange={handleFilter}
          />
          Polo
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="type"
            value="Basic"
            onChange={handleFilter}
          />
          Basic
        </label>
      </div>
    </div>
  );
};
export default FilterOptions;
