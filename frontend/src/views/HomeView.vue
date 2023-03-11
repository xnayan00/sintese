<template>
  <q-page>
    <section class="row q-col-gutter-lg q-pa-lg">
      <div class="col-3">
        <q-card>
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label class="text-grey-8">Alunos</q-item-label>
                <q-item-label class="text-h5">{{ students.length }}</q-item-label>
              </q-item-section>
    
              <q-item-section side top>
                <q-icon color="primary">
                  <MainIcon name="account-school" />
                </q-icon>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-separator />
          <q-card-actions align="between">
            <div class="text-positive">
              <span class="q-mr-sm">Ativos</span>
              <span class="text-weight-bold">{{ activeStudents }}</span>
            </div>
            <div class="text-negative">
              <span class="q-mr-sm">Inativos</span>
              <span class="text-weight-bold">{{ inactiveStudents }}</span>
            </div>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-3">
        <q-card>
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label class="text-grey-8">Turmas</q-item-label>
                <q-item-label class="text-h5">{{ teams.length }}</q-item-label>
              </q-item-section>
    
              <q-item-section side top>
                <q-icon color="primary">
                  <MainIcon name="class-room" />
                </q-icon>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-separator />
          <q-card-actions align="between">
            <div class="text-positive">
              <span class="q-mr-sm">Ativos</span>
              <span class="text-weight-bold">{{ activeTeams }}</span>
            </div>
            <div class="text-negative">
              <span class="q-mr-sm">Inativos</span>
              <span class="text-weight-bold">{{ inactiveTeams }}</span>
            </div>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-3">
        <q-card>
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label class="text-grey-8">Professores</q-item-label>
                <q-item-label class="text-h5">{{ teachers.length }}</q-item-label>
              </q-item-section>
    
              <q-item-section side top>
                <q-icon color="primary">
                  <MainIcon name="account-tie" />
                </q-icon>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-separator />
          <q-card-actions align="between">
            <div class="text-positive">
              <span class="q-mr-sm">Ativos</span>
              <span class="text-weight-bold">{{ activeTeachers }}</span>
            </div>
            <div class="text-negative">
              <span class="q-mr-sm">Inativos</span>
              <span class="text-weight-bold">{{ inactiveTeachers }}</span>
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </section>
  </q-page>
</template>

<script>
  import http from '@/http'
  import MainIcon from '@/components/icons/MainIcon.vue'
  export default {
    components: {
      MainIcon
    },
    data() {
      return {
        students: [],
        teams: [],
        teachers: [],
      }
    },
    computed: {
      inactiveStudents(){
        return this.students.filter(el => el.status == false).length
      },
      activeStudents(){
        return this.students.filter(el => el.status == true).length
      },
      inactiveTeams(){
        return this.teams.filter(el => el.status == false).length
      },
      activeTeams(){
        return this.teams.filter(el => el.status == true).length
      },
      inactiveTeachers(){
        return this.teachers.filter(el => el.status == false).length
      },
      activeTeachers(){
        return this.teachers.filter(el => el.status == true).length
      },
    },
    created(){
      http.get('counters')
        .then(res => {
          this.students = res.data.data.students
          this.teams = res.data.data.teams
          this.teachers = res.data.data.teachers
          console.log(res.data.data);
        })
    }
  }
</script>