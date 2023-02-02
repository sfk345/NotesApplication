let eventBus = new Vue()

Vue.component('notes', {
    template: `
    <div class="notes">
    <h1>Notes application</h1>
        <note-add></note-add>            
        <div>
            <div class="note">
                <h2>New task</h2>
                <columnOne :noteOne="noteOne"></columnOne>
            </div>
            <div class="note">
                <h2>Task in progress</h2>
                <columnTwo :noteTwo="noteTwo"></columnTwo>
            </div>
            <div class="note">
                <h2>Completed tasks</h2>
                <columnThree :noteThree="noteThree"></columnThree>
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            noteOne:[],
            noteTwo:[],
            noteThree:[],
        }
    },
    mounted(){
        eventBus.$on('firstColumn', noteCard => {
            if (this.noteOne.length < 3){
                this.noteOne.push(noteCard)
                console.log(this.noteOne)
            }
        })
        eventBus.$on('secondColumn', noteCard => {
            if (this.noteTwo.length < 5){
                this.noteTwo.push(noteCard)
                this.noteOne.splice(this.noteOne.indexOf(noteCard), 1)
            }
        })
        eventBus.$on('thirdColumn', noteCard => {
            this.noteThree.push(noteCard)
            this.noteTwo.splice(this.noteTwo.indexOf(noteCard), 1)
        })
        eventBus.$on('fromFirstColumnToThird', noteCard => {
            this.noteThree.push(noteCard)
            this.noteOne.splice(this.noteOne.indexOf(noteCard), 1)
        })
    },
})


Vue.component('columnOne', {
    template: `
    <div class="column">
        <div class="card-one" v-for="note in noteOne">
        <h3>{{note.name}}</h3>
            <span>
                <li v-for="task in note.arrayTasks" v-if="task.text != null">
                    <strong>{{task.id}}</strong>
                    <input type="checkbox"
                    v-on:change="task.completed = true"
                    :disabled="task.completed"
                    v-on:change="note.status += 1"
                    @change.prevent="changeCol(note)">
                    <span :class="{done: task.completed}">{{task.text}}</span>
                </li>
            </span>
        </div>
    </div>`,
    methods: {
        changeCol(noteCard) {
            let allNotes = 0
            for (let i = 0; i < 5; i++){
                if (noteCard.arrayTasks[i].text != null){
                    allNotes ++
                }
            }
            if (((noteCard.status / allNotes) * 100 >= 50) && (noteCard.status / allNotes)){
                eventBus.$emit('addSecondColumn', noteCard)
            }
            if ((noteCard.status / allNotes) * 100 === 100) {
                noteCard.date = new Date().toLocaleString()
                eventBus.$emit('addThirdColumn', noteCard)
            }
        }
    },
    props: {
        noteOne: {
            type: Array,
            required: false
        }
    }
})

Vue.component('columnTwo', {
    template: `
    <div class="column">
        <div class="card-one" v-for="note in noteTwo">
        <h3>{{note.name}}</h3>
            <span>
                <li v-for="task in note.arrayTasks" v-if="task.text != null">
                    <strong>{{task.id}}</strong>
                    <input type="checkbox"
                    v-on:change="task.completed = true"
                    :disabled="task.completed"
                    v-on:change='note.status += 1'
                    @change.prevent="changeColSec(n)">
                    <span :class="{done: task.completed}">{{task.text}}</span>
                </li>
            </span>
        </div>
    </div>
    
    `,
    props:{
        noteTwo: {
            type: Array,
            required: false
        }
    },
    methods: {
        changeColSec(noteCard) {
            let allNotes = 0
            for (let i = 0; i < 5; i++){
                if (noteCard.tasks[i].text != null){
                    allNotes ++
                }
            }
            if ((noteCard.status / allNotes) * 100 === 100) {
                noteCard.date = new Date().toLocaleString()
                eventBus.$emit('addThirdColumn', noteCard)
            }
        }
    },

})

Vue.component('columnThree', {
    template: `
    <div class="column">
        <div class="card-one" v-for="note in noteThree">
        <h3>{{note.name}}</h3>
            <span>
                <li v-for="task in note.arrayTasks" v-if="task.text != null">
                    <strong>{{task.id}}</strong>
                    <input type="checkbox"
                    :disabled="task.completed">
                    <span :class="{done: task.completed}">{{task.text}}</span>
                </li>
                <p>Date of the problem solution: {{note.date}}</p>
            </span>
        </div>
    </div>
    `,
    props:{
        noteThree: {
            type: Array,
            required: false
        }
    },
})

Vue.component('note-add', {
    template: `
    <form class="note-form">
        <div>
            <h2>New add</h2>
                <div class="name-column">
                    <label for="name">Name of the note</label>
                    <input id="name" v-model="name" maxlength="50" type="text" placeholder="Text">
                </div>
                <div class="name-column">
                    <label for="name">Your note</label>
                    <input required id="noteOne" v-model="titleOne" maxlength="50" placeholder="Text of the first note">
                </div>
                <div class="name-column">
                    <label for="name">Your note</label>
                    <input required id="noteTwo" v-model="titleTwo" maxlength="50" placeholder="Text of the second note">
                </div>
                <div class="name-column">
                    <label for="name">Your note</label>
                    <input required id="noteThree" v-model="titleThree" maxlength="50" placeholder="Text of the third note">
                </div>
                <div class="name-column">
                    <label for="name">Your note</label>
                    <input id="noteFore" v-model="titleFore" maxlength="50" placeholder="Text of the fourth note">
                </div>
                <div class="name-column">
                    <label for="name">Your note</label>
                    <input id="noteFife" v-model="titleFife" maxlength="50" placeholder="Text of the fifth note">
                </div>
                <input @click="onSubmit" class="btn" type="button" value="Add">
        </div>
    </form>
    `,
    data(){
        return{
            name: null,
            titleOne: null,
            titleTwo: null,
            titleThree: null,
            titleFore: null,
            titleFife: null,

        }

    },
    methods: {
        onSubmit(){
            let noteCard = {
                name: this.name,
                arrayTasks: [{id: 1, text: this.titleOne, completed: false},
                    {id: 2, text: this.titleTwo, completed: false},
                    {id: 3, text: this.titleThree, completed: false},
                    {id: 4, text: this.titleFore, completed: false},
                    {id: 5, text: this.titleFife, completed: false}
                ],
                date: null,
                status: 0
            }
            eventBus.$emit('note-submitted', noteCard),
                this.name = null,
                this.tasks = null,
                this.titleOne = null,
                this.titleTwo = null,
                this.titleThree = null,
                this.titleFore = null,
                this.titleFife = null,
                console.log(noteCard)
        }
    },
    props: {
        noteOne: {
            type: Array,
            required: false
        }
    }
})


let app = new Vue({
    el: '#app',

})