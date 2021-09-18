/* eslint-disable no-param-reassign */
import './table.css';
import { tableT, tableRowT } from './table.template';
import { noteTransform } from '../../lib/utils';
import engine from '../../lib/engine/engine';

import Form from '../form/form';

export default class Table {
    constructor() {
        this.container = document.querySelector('tbody');

        this.form = new Form(this.container);
        this.form.node.addEventListener('submit', (e) => this.onFormSubmit(e));

        this.addButton = document.querySelector('.plus-sign');
        this.addButton.addEventListener('click', () => this.form.show());
        this.container.addEventListener('click', (e) => this.onEdit(e));
        this.container.addEventListener('click', (e) => Table.onRemove(e));

        window.addEventListener('beforeunload', () => this.onWindowClose());
    }

    render(notes) {
        const html = engine(tableT(notes));
        this.container.innerHTML = html;
        this.notes = [...this.container.children];
    }

    onFormSubmit(e) {
        this.form.clearErrors();
        if (this.form.checkSubmit(e)) {
            const note = this.form.getFormData();

            if (this.edited) {
                [...this.edited.children].forEach((td) => {
                    const keyTd = td.className.substring(4);

                    Object.entries(note).forEach(([key, value]) => {
                        if (key === keyTd) td.textContent = value;
                    });
                });

                this.edited = null;
                return;
            }

            const noteTmp = noteTransform(note);
            const newNote = engine(tableRowT(noteTmp));
            this.container.insertAdjacentHTML('beforeend', newNote);

            this.form.clearFields();
        }
    }

    onEdit(e) {
        if (e.target.classList.contains('button__edit')) {
            const noteEl = e.target.closest('.table__row');
            this.edited = noteEl;

            const note = Table.getNoteData(noteEl);
            this.form.show(note);
        }
    }

    static onRemove(e) {
        if (e.target.classList.contains('button__delete')) {
            const noteEl = e.target.closest('.table__row');
            noteEl.remove();
        }
    }

    static getNoteData(noteEl) {
        return [...noteEl.children].reduce((total, td) => {
            const key = td.className.substring(4);
            const value = td.textContent;

            if (key !== 'actions') total[key] = value;
            return total;
        }, {});
    }
}
