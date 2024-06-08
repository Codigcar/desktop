const Filter = () => {
  const filters = [
    {
      filterGroup: 'País',
      data: [
        { text: 'Argentina', value: 12 },
        { text: 'Brasil', value: 4 },
        { text: 'Chile', value: 5 },
        { text: 'Colombia', value: 10 },
        { text: 'Perú', value: 18 },
      ],
    },
    {
      filterGroup: 'Años de experiencia',
      data: [
        { text: 'Sin experiencia', value: 12 },
        { text: '1 año', value: 4 },
        { text: '2 años', value: 5 },
        { text: '3-4 años', value: 10 },
        { text: '5-10 años', value: 18 },
      ],
    },
    {
      filterGroup: 'Modalidad',
      data: [
        { text: 'Remota', value: 34 },
        { text: 'Presencial', value: 56 },
      ],
    },
    {
      filterGroup: 'Fecha de publicación',
      data: [
        { text: 'Hoy', value: 34 },
        { text: 'Esta semana', value: 56 },
        { text: 'Últimos 15 días', value: 20 },
      ],
    },
  ];

  return (
    <div className="filter">
      <div className="filter-header">
        <h3 className="text-20">
          <strong className="black">Filtro</strong>
        </h3>

        <button className="c-brand-1">Limpiar</button>
      </div>

      <div className="filter-body">
        {filters.map((filter, i) => (
          <div className="filter-group" key={i}>
            <p className="filter-group__title">
              <strong>{filter.filterGroup}</strong>
            </p>

            <div className="filter-group__content">
              {filter.data.map((item, i) => (
                <div className="item" key={i}>
                  <div className="item-checkbox">
                    <div className="form-group-check">
                      <label className="form-group-check__wrap">
                        <input className="" type="checkbox" />
                        <span className="form-box-check"></span>
                        <span className="form-label-check">{item.text}</span>
                      </label>
                    </div>

                    <div className="item-number">
                      <p className="value">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
