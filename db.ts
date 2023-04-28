// type Maybe<T> = T | null | undefined
// const withDefault: <T, K>(maybe: Maybe<T>, ifsothen: ((t: T) => K), otherwise: K) => K
//   = (maybe, ifsothen, otherwise) => maybe == null ? otherwise : ifsothen(maybe)

/**
 * SYMPTOMS
 */
type Meta<T extends string> = {
  kind: T,
  name: string | null,
  description: string | null
}
const Symptom: (description: string) => Meta<"symptom"> = (description) => ({ name: null, description, kind: "symptom" })

const thesymptoms = {
  shit: Symptom("in pants"),
  fuck: Symptom("nu er det nok"),
  out: Symptom("in real life"),
  of: Symptom("stuff"),
  luck: Symptom("kcul"),
} as const
type Symptom = keyof typeof thesymptoms

/**
 * DRUGS
 */
type DB_Drug = {
  symptoms: Set<Symptom>
}
const Drug = (...symptoms: Symptom[]): DB_Drug => ({ symptoms: new Set(symptoms) })

const thedrugs = {
  LSD: Drug("luck", "shit"),
  DMT: Drug("out", "of", "fuck"),
  Salvia: Drug("shit"),
  TwoCB: Drug("fuck", "luck")

} as const satisfies {
  [key: string]: DB_Drug
}
type Drug = keyof typeof thedrugs
const theDrugNames = Object.keys(thedrugs) as Drug[]


/**
 * FUSE
 */


function fuse(...drugs: Drug[]) {
  const logLabel = `${fusions++} fuse ${drugs}:`
  const log = (label: string) => (...args: any[]) => console.log(Date.now(), label, ...args)
  const logfuse = log(logLabel)

  const warnings = drugs.flatMap(drug1 => drugs.flatMap(drug2 => drug1 == drug2 ? null : Array.from(thedrugs[drug1].symptoms).flatMap(symp1 => Array.from(thedrugs[drug2].symptoms).map(symp2 => symp1 == symp2 ? [drug1, drug2, "will worsen", symp1] as [Drug, Drug, string, Symptom] : null)))).filter(no => no != null)
  warnings.forEach((what)=>logfuse(what))
}
let fusions = 0

// theDrugNames.forEach(d1 => theDrugNames.forEach(d2 => d1 == d2 ? null : fuse(d1, d2)))
fuse(...theDrugNames)
