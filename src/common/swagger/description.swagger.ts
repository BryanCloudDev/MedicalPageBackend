import { Roles } from 'src/user/enums'
import { capitalize } from '../utils/capitalize.utils'

export class Description {
  static message(role: string) {
    return `${role} can use this endpoint`
  }

  static administrator = Description.message(capitalize(Roles.ADMINISTRATOR))
  static patient = Description.message(capitalize(Roles.PATIENT))
  static doctor = Description.message(capitalize(Roles.DOCTOR))

  static getAdministratorAndPatient(): string {
    return `${Description.administrator} <br> ${Description.patient}`
  }

  static getAdministratorAndDoctor(): string {
    return `${Description.administrator} <br> ${Description.doctor}`
  }

  static getPatientAndDoctor(): string {
    return `${Description.patient} <br> ${Description.doctor}`
  }

  static getAdministratorPatientAndDoctor(): string {
    return `${Description.administrator} <br> ${Description.patient} <br> ${Description.doctor}`
  }

  static getPatientAdministratorAndDoctor(): string {
    return `${Description.patient} <br> ${Description.administrator} <br> ${Description.doctor}`
  }

  static getDoctorAdministratorAndPatient(): string {
    return `${Description.doctor} <br> ${Description.administrator} <br> ${Description.patient}`
  }

  static getDoctorPatientAndAdministrator(): string {
    return `${Description.doctor} <br> ${Description.patient} <br> ${Description.administrator}`
  }
}
