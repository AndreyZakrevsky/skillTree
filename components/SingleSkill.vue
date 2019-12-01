<template lang="pug">
  .form-style.single-skill
    .skill-top-part
      badge-stars-barrier.big-badge(:class="{['level' + form.level]: form.level != 0}")
      div
        h3 {{ form.name }}
        template(v-if="active")
          .skill-status.active Activated
        template(v-else)
          button.btn-main(:disabled="!allActive" @click="$emit('activate', allActive)") Activate
          button.btn-transparent.btn-star(@click="$emit('add-goal')")
            img(src="~assets/img/star.svg" alt="star")
            | Add to My Goals
      .close-skill
        button.close-btn(@click="$emit('close')")
          img(src="~assets/img/icon-close.svg" alt="close-icon")
    .skill-required(v-if="form.skills")
      h4 Required Badges:
      span.skills
        .skill-active(v-for="skill in form.skills")
          badge-stars(:class="{'badge-gray': !skill.active, ['level' + skill.level]: skill.level != 0}")
          div
            h5 {{skill.name}}
            span.skill-status(:class="{'active': skill.active }")
              | {{skill.active ? "Activated" : "Inactive"}}
    div(v-if="form.descr")
      h4 Description
      p.skill-text {{ form.descr }}
    div
      h4 Top employees: {{employees.length}}
      ol.skill-text
        li(v-for="employee in employees.slice(0, displayedEmployeesCount)") {{employee.name}}

      button.btn-transparent.btn-show-more(@click="displayedEmployeesCount += 5" :disabled="allEmployeesDisplayed" ) Show More
</template>

<script>
import BadgeStars from '~/components/svg/BadgeStars.vue'
import BadgeStarsBarrier from '~/components/svg/BadgeStarsBarrier.vue'

export default {
  props: {
    form: {
      type: Object,
      default: () => ({
        name: '',
        descr: '',
        level: 0,
        skills: [
          {name: "MySQL Basic",
           active: true},
          {name: "SQL Queries",
           active: false},
         ]
      })
    },
    active: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    allActive () {
      if (!this.form.skills) return true
      return this.form.skills.every(skill => skill.active)
    },
    allEmployeesDisplayed () {
      return this.displayedEmployeesCount >= this.employees.length
    }
  },

  data () {
    return {
      employees: [
        {name: "Andrew Walters"},
        {name: "Billy Lucas"},
        {name: "Aaron Castro"},
        {name: "Keith Hughes"},
        {name: "Patrick Keller"},
        {name: "George Chavez"},
        {name: "Willie Fowler"},
        {name: "Edward Porter"},
        {name: "James Gardner"},
        {name: "Scott Johnson"},
        {name: "Walter Martinez"},
        {name: "Douglas Ward"},
      ],
      displayedEmployeesCount: 5,
    }
  },
  components: {
    BadgeStars,
    BadgeStarsBarrier,
  }
}
</script>

<style lang="scss" scoped>
ol {
  padding-left: 20px;
}

ol li {
  counter-increment: list;
  list-style-type: none;
  position: relative;
  padding-top: 12px;
  padding-left: 30px;
  font-family: 'Avenir-Medium';
  color: #252F39;
}

ol li:before {
  color: #252F39;
  content: counter(list) ".";
  left: -32px;
  position: absolute;
  text-align: right;
  width: 26px;
}
</style>
