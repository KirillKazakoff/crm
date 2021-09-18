import Table from '../components/table/table';
import db from '../../db.json';
import { goToTable } from '../lib/utils';

export default class Controller {
    constructor() {
        window.onload = () => {
            this.table = new Table();
            const notes = goToTable(db);
            this.table.render(notes);
        };
    }
}
