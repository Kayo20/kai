// Script to insert translations for all content keys
// Run with: node scripts/insert-translations.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yzilrdxggwbioqgvtxrc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6aWxyZHhnZ3diaW9xZ3Z0eHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4OTk3OTQsImV4cCI6MjA4MzQ3NTc5NH0.0J2c_aW74qbp-bnubzZb51RAlKQhqijWtEB5PNhkoXc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Translations data: { key: { en: 'text', es: 'texto', fr: 'texte' } }
const translations = {
    // Events
    'nav.events': { en: 'Events', es: 'Eventos', fr: 'Événements' },
    'events.loading': { en: 'Loading events...', es: 'Cargando eventos...', fr: 'Chargement des événements...' },
    'events.error_msg': { en: 'Please try again later or contact support.', es: 'Por favor, inténtelo de nuevo más tarde o contacte con soporte.', fr: 'Veuillez réessayer plus tard ou contacter le support.' },
    'events.not_found': { en: 'No upcoming events at the moment', es: 'No hay eventos próximos en este momento', fr: 'Aucun événement à venir pour le moment' },
    'events.check_back': { en: 'Check back soon for new events!', es: '¡Vuelva pronto para ver nuevos eventos!', fr: 'Revenez bientôt pour de nouveaux événements !' },
    'view_event': { en: 'View Event', es: 'Ver Evento', fr: 'Voir l\'Événement' },
    'view_all_events': { en: 'View All Events', es: 'Ver Todos los Eventos', fr: 'Voir Tous les Événements' },

    // Contact
    'contact.title': { en: 'Book a Meeting', es: 'Reservar una Reunión', fr: 'Réserver une Réunion' },
    'contact.subtitle': { en: 'Schedule a one-on-one consultation with our team', es: 'Programe una consulta individual con nuestro equipo', fr: 'Planifiez une consultation individuelle avec notre équipe' },
    'contact.bookings_text': { en: 'Schedule a convenient time to discuss your needs', es: 'Programe un momento conveniente para discutir sus necesidades', fr: 'Planifiez un moment convenable pour discuter de vos besoins' },
    'contact.form_title': { en: 'Send a Message', es: 'Enviar un Mensaje', fr: 'Envoyer un Message' },
    'contact.form_description': { en: 'Fill out the form below and we will get back to you as soon as possible', es: 'Complete el formulario a continuación y nos pondremos en contacto con usted lo antes posible', fr: 'Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible' },
    'contact.company_label': { en: 'Company Name', es: 'Nombre de la Empresa', fr: 'Nom de l\'Entreprise' },
    'contact.email_title': { en: 'Prefer Email?', es: '¿Prefiere Email?', fr: 'Vous Préférez l\'Email ?' },
    'contact.email_subtitle': { en: 'Click below to send us an email', es: 'Haga clic a continuación para enviarnos un correo electrónico', fr: 'Cliquez ci-dessous pour nous envoyer un email' },
    'name': { en: 'Name', es: 'Nombre', fr: 'Nom' },
    'email': { en: 'Email', es: 'Correo Electrónico', fr: 'Email' },
    'message': { en: 'Message', es: 'Mensaje', fr: 'Message' },
    'submit': { en: 'Send Message', es: 'Enviar Mensaje', fr: 'Envoyer le Message' },
    'legal.send_email_button': { en: 'Send Email', es: 'Enviar Email', fr: 'Envoyer un Email' },

    // Enroll
    'enroll.plans_title': { en: 'Choose Your Plan', es: 'Elija Su Plan', fr: 'Choisissez Votre Plan' },
    'enroll.plans_subtitle': { en: 'Select the best plan for your practice', es: 'Seleccione el mejor plan para su práctica', fr: 'Sélectionnez le meilleur plan pour votre pratique' },
    'enroll.plan_period': { en: '/month', es: '/mes', fr: '/mois' },
    'enroll.pay_now': { en: 'PAY NOW', es: 'PAGAR AHORA', fr: 'PAYER MAINTENANT' },
    'enroll.plan_basic_name': { en: 'BASIC', es: 'BÁSICO', fr: 'BASIQUE' },
    'enroll.plan_basic_price': { en: '$29', es: '$29', fr: '$29' },
    'enroll.plan_basic_desc': { en: 'Essential features for small practices', es: 'Características esenciales para pequeñas prácticas', fr: 'Fonctionnalités essentielles pour les petites pratiques' },
    'enroll.plan_basic_feature1': { en: 'Access to Ready-to-use Kit', es: 'Acceso al Kit listo para usar', fr: 'Accès au Kit prêt à l\'emploi' },
    'enroll.plan_basic_feature2': { en: 'Basic Data Centre access', es: 'Acceso básico al Centro de Datos', fr: 'Accès de base au Centre de Données' },
    'enroll.plan_basic_feature3': { en: 'Community support', es: 'Soporte de la comunidad', fr: 'Support communautaire' },
    'enroll.plan_standard_name': { en: 'STANDARD', es: 'ESTÁNDAR', fr: 'STANDARD' },
    'enroll.plan_standard_price': { en: '$59', es: '$59', fr: '$59' },
    'enroll.plan_standard_desc': { en: 'Best value for growing practices', es: 'Mejor valor para prácticas en crecimiento', fr: 'Meilleur rapport qualité-prix pour les pratiques en croissance' },
    'enroll.plan_standard_feature1': { en: 'All BASIC features', es: 'Todas las características BÁSICAS', fr: 'Toutes les fonctionnalités BASIQUES' },
    'enroll.plan_standard_feature2': { en: 'Full Data Centre access', es: 'Acceso completo al Centro de Datos', fr: 'Accès complet au Centre de Données' },
    'enroll.plan_standard_feature3': { en: 'Trusted Alliance resources', es: 'Recursos de la Alianza de Confianza', fr: 'Ressources de l\'Alliance de Confiance' },
    'enroll.plan_standard_feature4': { en: 'Priority support', es: 'Soporte prioritario', fr: 'Support prioritaire' },
    'enroll.plan_premium_name': { en: 'PREMIUM', es: 'PREMIUM', fr: 'PREMIUM' },
    'enroll.plan_premium_price': { en: '$99', es: '$99', fr: '$99' },
    'enroll.plan_premium_desc': { en: 'Full access and personalized support', es: 'Acceso completo y soporte personalizado', fr: 'Accès complet et support personnalisé' },
    'enroll.plan_premium_feature1': { en: 'All STANDARD features', es: 'Todas las características ESTÁNDAR', fr: 'Toutes les fonctionnalités STANDARD' },
    'enroll.plan_premium_feature2': { en: '1-on-1 consulting', es: 'Consultoría 1 a 1', fr: 'Consultation 1 à 1' },
    'enroll.plan_premium_feature3': { en: 'Custom integrations', es: 'Integraciones personalizadas', fr: 'Intégrations personnalisées' },
    'enroll.plans_include_title': { en: 'All Plans Include', es: 'Todos los Planes Incluyen', fr: 'Tous les Plans Incluent' },
    'enroll.guarantee_title': { en: 'Money-Back Guarantee', es: 'Garantía de Devolución de Dinero', fr: 'Garantie de Remboursement' },
    'enroll.guarantee_text': { en: '30-day satisfaction guarantee', es: 'Garantía de satisfacción de 30 días', fr: 'Garantie de satisfaction de 30 jours' },
    'enroll.cancel_title': { en: 'Cancel Anytime', es: 'Cancelar en Cualquier Momento', fr: 'Annuler à Tout Moment' },
    'enroll.cancel_text': { en: 'No long-term commitment required', es: 'No se requiere compromiso a largo plazo', fr: 'Aucun engagement à long terme requis' },
    'enroll.secure_title': { en: 'Secure Payment', es: 'Pago Seguro', fr: 'Paiement Sécurisé' },
    'enroll.secure_text': { en: 'Your data is safe with us', es: 'Sus datos están seguros con nosotros', fr: 'Vos données sont en sécurité avec nous' },

    // Navigation
    'nav.contact': { en: 'Contact Us', es: 'Contáctenos', fr: 'Contactez-nous' }
};

async function insertTranslations() {
    console.log('🚀 Starting translations insertion...\n');

    // First, get all content keys
    const { data: contentKeys, error: keysError } = await supabase
        .from('content_keys')
        .select('id, key');

    if (keysError) {
        console.error('❌ Error fetching content keys:', keysError);
        return;
    }

    console.log(`📝 Found ${contentKeys.length} content keys in database\n`);

    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    for (const contentKey of contentKeys) {
        const translationData = translations[contentKey.key];

        if (!translationData) {
            skippedCount++;
            continue;
        }

        // Insert translations for each language
        for (const [locale, text] of Object.entries(translationData)) {
            try {
                const { error } = await supabase
                    .from('translations')
                    .upsert({
                        content_key_id: contentKey.id,
                        locale,
                        text
                    }, { onConflict: 'content_key_id,locale' });

                if (error) {
                    console.error(`❌ Error inserting ${contentKey.key} (${locale}):`, error.message);
                    errorCount++;
                } else {
                    console.log(`✅ Inserted: ${contentKey.key} (${locale})`);
                    successCount++;
                }
            } catch (err) {
                console.error(`❌ Exception inserting ${contentKey.key} (${locale}):`, err.message);
                errorCount++;
            }
        }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   ⏭️  Skipped: ${skippedCount}`);
    console.log(`   📝 Total keys: ${contentKeys.length}`);
}

// Run the insertion
insertTranslations()
    .then(() => {
        console.log('\n✨ Translations insertion complete!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('\n💥 Fatal error:', err);
        process.exit(1);
    });
