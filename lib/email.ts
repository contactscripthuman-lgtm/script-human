import { Resend } from 'resend';

// Vercel build phase may not have the API key available, so we provide a fallback
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_fallback_key');

// Fallback email for testing to avoid bounce restrictions
const FROM_EMAIL = 'onboarding@resend.dev';

export async function sendUpgradeEmail(email: string, name: string, planName: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is not set. Skipping upgrade email.');
        return;
    }

    try {
        const data = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: `Welcome to ScriptHuman ${planName}! 🎉`,
            html: `
                <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
                    <h2>Thank you for upgrading, ${name || 'friend'}!</h2>
                    <p>You have successfully unlocked the <strong>${planName}</strong> plan on ScriptHuman.</p>
                    <p>You now have access to premium features to help you detect Silicon Smog and humanize your content with advanced capabilities.</p>
                    <a href="https://script-human.vercel.app/writing-room" style="display: inline-block; padding: 12px 24px; background-color: #f97316; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 16px;">Go to the Writing Room</a>
                </div>
            `
        });

        console.log(`Upgrade email sent to ${email}`, data);
        return data;
    } catch (error) {
        console.error('Error sending upgrade email:', error);
    }
}

export async function sendDowngradeEmail(email: string, name: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is not set. Skipping downgrade email.');
        return;
    }

    try {
        const data = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: `Your ScriptHuman Subscription Update`,
            html: `
                <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
                    <h2>Hi ${name || 'there'},</h2>
                    <p>You have successfully cancelled your premium subscription, or your payment has failed.</p>
                    <p>Your account has been moved to the Free plan. You will no longer have access to premium features or unlimited generation, but you can still use the basic tools with daily limits.</p>
                    <p>If this was a mistake, or you wish to regain access to advanced features, you can upgrade your plan at any time from your account settings.</p>
                    <a href="https://script-human.vercel.app/#pricing" style="display: inline-block; padding: 12px 24px; background-color: #f97316; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 16px;">View Plans</a>
                </div>
            `
        });

        console.log(`Downgrade email sent to ${email}`, data);
        return data;
    } catch (error) {
        console.error('Error sending downgrade email:', error);
    }
}
