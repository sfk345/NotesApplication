let eventBus = new Vue()

Vue.component('notes', {
    template: `
    <div class="notes">
        <div class="all-notes">
        <p class="error" v-for="error in errors">{{error}}</p>
            <div class="note-one">
                <h1>New task</h1>
                <columnOne class="one" :noteOne="noteOne"></columnOne>
            </div>
            <div class="note-two">
                <h1>Task in progress</h1>
                <columnTwo class="two" :noteTwo="noteTwo"></columnTwo>
            </div>
            <div class="note-three">
                <h1>Completed tasks</h1>
                <columnThree class="two" :noteThree="noteThree"></columnThree>
            </div>
        </div>
        <div class="note-add">
            <note-add></note-add>
        </div>

    </div>
    `,
    data(){
        return{
            noteOne: [],
            noteTwo: [],
            noteThree: [],
            errors: []
        }
    },
    mounted(){
        eventBus.$on('firstColumn', noteCard => {
            this.errors = []
            if (this.noteOne.length < 3){
                this.noteOne.push(noteCard)
                console.log(this.noteOne)
            } else {
                this.errors.push("The quantity noticeably exceeds the permissible norms")
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

Vue.component('note-add', {
    template: `
<div>
    <h1>New add</h1>
    <form class="note-form" @submit.prevent="onSubmit">
        <p class="name-column">
            <label for="name">Name of the note</label>
            <input id="name" v-model="name" maxlength="50" type="text" placeholder="Text">
        </p>
        <p class="name-column">
            <label for="noteOne">Your first note</label>
            <input required id="noteOne" v-model="titleOne" maxlength="50" placeholder="Text of the first note">
        </p>
        <p class="name-column">
            <label for="noteTwo">Your second note</label>
            <input required id="noteTwo" v-model="titleTwo" maxlength="50" placeholder="Text of the second note">
        </p>
        <p class="name-column">
            <label for="noteThree">Your third note</label>
            <input required id="noteThree" v-model="titleThree" maxlength="50" placeholder="Text of the third note">
        </p>
        <p class="name-column">
            <label for="noteFore">Your fourth note</label>
            <input id="noteFore" v-model="titleFore" maxlength="50" placeholder="Text of the fourth note">
        </p>
        <p class="name-column">
            <label for="noteFife">Your fifth note</label>
            <input id="noteFife" v-model="titleFife" maxlength="50" placeholder="Text of the fifth note">
        </p>
        <p class="name-column">
            <input class="btn" type="submit" value="Add">
        </p>
    </form>
</div>
    `,
    data(){
        return{
            name: null,
            titleOne: null,
            titleTwo: null,
            titleThree: null,
            titleFore: null,
            titleFife: null,
            errors: [],

        }

    },
    methods: {
        onSubmit(){
            let noteCard = {
                name: this.name,
                tasks: [{text: this.titleOne, completed: false},
                    {text: this.titleTwo, completed: false},
                    {text: this.titleThree, completed: false},
                    {text: this.titleFore, completed: false},
                    {text: this.titleFife, completed: false}],
                date: null,
                status: 0
            }
            eventBus.$emit('note-submitted', noteCard)
            this.name = null
            this.titleOne = null
            this.titleTwo = null
            this.titleThree = null
            this.titleFore = null
            this.titleFife = null
            console.log(noteCard)
        }
    },
})

Vue.component('columnOne', {
    template: `
    <div class="column">
        <div class="card-one" v-for="n in noteOne">
        <h3>{{n.name}}</h3>
            <span>
                <li v-for="t in n.tasks" v-if="t.text != null">
                    <input type="checkbox"
                    v-on:change="t.completed = true"
                    :disabled="task.completed"
                    v-on:change="t.status += 1"
                    @change.prevent="changeCol(n)">
                    <span :class="{done: t.completed}">{{t.text}}</span>
                </li>
            </span>
        </div>
    </div>
    `,
    methods: {
        changeCol(noteCard) {
            let allNotes = 0
            for (let i = 0; i < 5; i++){
                if (noteCard.tasks[i].text != null){
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
        },
    }
})

Vue.component('columnTwo', {
    template: `
    <div class="column">
        <div class="card-one" v-for="n in noteTwo">
        <h3>{{n.name}}</h3>
            <span>
                <li v-for="t in n.tasks" v-if="t.text != null">
                    <input type="checkbox"
                    v-on:change="t.completed = true"
                    :disabled="task.completed"
                    v-on:change="t.status += 1"
                    @change.prevent="changeColSec(n)">
                    <span :class="{done: t.completed}">{{t.text}}</span>
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
        <div class="card-one" v-for="n in noteThree">
        <h3>{{n.name}}</h3>
            <span>
                <li v-for="t in n.tasks" v-if="t.text != null">
                    <input type="checkbox"
                    :disabled="task.completed">
                    <span :class="{done: t.completed}">{{t.text}}</span>
                </li>
                <p>Date of the problem solution: {{n.date}}</p>
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



let app = new Vue({
    el: '#app',
    data: {
        name: "Notes application"
    }
})