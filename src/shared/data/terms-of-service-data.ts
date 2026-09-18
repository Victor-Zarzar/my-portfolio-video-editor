import { m } from "#/paraglide/messages"

export const sectionsTerms = [
  {
    title: m.terms_of_service_acceptance_title(),
    text: m.terms_of_service_acceptance_description(),
  },
  {
    title: m.terms_of_service_site_use_title(),
    text: m.terms_of_service_site_use_description(),
  },
  {
    title: m.terms_of_service_intellectual_property_title(),
    text: m.terms_of_service_intellectual_property_description(),
  },
  {
    title: m.terms_of_service_hiring_title(),
    text: m.terms_of_service_hiring_description(),
  },
  {
    title: m.terms_of_service_third_party_title(),
    text: m.terms_of_service_third_party_description(),
  },
  {
    title: m.terms_of_service_liability_title(),
    text: m.terms_of_service_liability_description(),
  },
  {
    title: m.terms_of_service_changes_title(),
    text: m.terms_of_service_changes_description(),
  },
  {
    title: m.terms_of_service_contact_title(),
    text: m.terms_of_service_contact_description(),
  },
] as const
