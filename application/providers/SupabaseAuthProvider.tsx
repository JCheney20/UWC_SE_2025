import { supabase } from '@/utils/supabase'
import { Profile } from '@/utils/types'
import { Session } from '@supabase/supabase-js'
import { createContext, use, useEffect, useState } from 'react'

export const SupabaseAuthContext = createContext<Session | null>(null)

export function SupabaseAuthProvider({children}: {children: React.ReactNode}) {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ? { ...session } : null)
    })

    return supabase.auth.onAuthStateChange(
      (_, session) => setSession(session ? { ...session } : null)
    ).data.subscription.unsubscribe
  }, [])

  return (
    <SupabaseAuthContext.Provider value={session}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}
