<template>
  <component :is="name + '-icon'" />
</template>

<script>
  import AccountGroupIcon from './AccountGroupIcon.vue'
  import AccountIcon from './AccountIcon.vue'
  import AccountSchoolIcon from './AccountSchoolIcon.vue'
  import ClassRoomIcon from './ClassRoomIcon.vue'
  import HomeIcon from './HomeIcon.vue'
  import HandCoinIcon from './HandCoinIcon.vue'
  import LockIcon from './LockIcon.vue'
  import AccountTieIcon from './AccountTieIcon.vue'
  import DotsVerticalIcon from './DotsVerticalIcon.vue'
  import PencilIcon from './PencilIcon.vue'
  import TrashIcon from './TrashIcon.vue'
  import CloseCircleIcon from './CloseCircleIcon.vue'
  import CheckCircleIcon from './CheckCircleIcon.vue'
  import ExitIcon from './ExitIcon.vue'
  import EyeIcon from './EyeIcon.vue'
  import EmailIcon from './EmailIcon.vue'
  import PhoneIcon from './PhoneIcon.vue'
  import CakeVariantIcon from './CakeVariantIcon.vue'
  import CloseIcon from './CloseIcon.vue'
  import AlertCircleIcon from './AlertCircleIcon.vue'
  import CalendarIcon from './CalendarIcon.vue'
  import WhatsappIcon from './WhatsappIcon.vue'
  import DanceBallroomIcon from './DanceBallroomIcon.vue'
  import PlusCircleIcon from './PlusCircleIcon.vue'
  import MinusCircleIcon from './MinusCircleIcon.vue'
  import ClockIcon from './ClockIcon.vue'
  import EditIcon from './EditIcon.vue'

  export default {
    props: {
      name: String
    },
    components: {
      AccountIcon,
      AlertCircleIcon,
      AccountGroupIcon,
      AccountSchoolIcon,
      AccountTieIcon,
      CakeVariantIcon,
      CalendarIcon,
      CheckCircleIcon,
      ClassRoomIcon,
      CloseCircleIcon,
      CloseIcon,
      ClockIcon,
      DanceBallroomIcon,
      DotsVerticalIcon,
      EditIcon,
      ExitIcon,
      EyeIcon,
      EmailIcon,
      HomeIcon,
      HandCoinIcon,
      MinusCircleIcon,
      LockIcon,
      PencilIcon,
      PhoneIcon,
      PlusCircleIcon,
      TrashIcon,
      WhatsappIcon,
    }
  }
</script>