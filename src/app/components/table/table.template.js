const tableRowTd = ([key, value], index) => ({
    block: 'td',
    cls: `td__${key}`,
    content: value,
    attrs: {
        id: index,
    },
});

const tableRowT = (note) => ({
    block: 'tr',
    cls: 'table__row',
    content: Object.entries(note).map(tableRowTd),
});

const tableT = (notes) => ({
    block: 'table',
    cls: 'table',
    content: notes.map(tableRowT),
});

export { tableT, tableRowT };
