import ContactDetails from "@/components/contact/ContactDetails";
import ContactForm from "@/components/contact/ContactForm";
import SectionBanner from "@/components/reusable/SectionBanner";

const Contact = () => {
  return (
    <div>
      <SectionBanner title="Contact" />
      <div className="my-[100px]">
        <div className="container">
            <div className="md:grid grid-cols-2 gap-[192px]">
                <ContactDetails />
                <ContactForm />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
