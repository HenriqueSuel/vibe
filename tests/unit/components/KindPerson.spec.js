import { shallowMount } from "@vue/test-utils";
import KindPerson from "@/components/kind-person/KindPerson";

describe("kind-person.vue", () => {
  it("should the doctor is selected", () => {
    const wrapper = shallowMount(KindPerson, {
      propsData: {
        isPatient: false,
      }
    })
    const card = wrapper.find('.active').find('p').text();
    expect(card).toBe('Sou medico')
  });
  it("should the patient is selected", () => {
    const wrapper = shallowMount(KindPerson, {
      propsData: {
        isPatient: true,
      }
    })
    const card = wrapper.find('.active').find('p').text();
    expect(card).toBe('Sou paciente')
  });
});
